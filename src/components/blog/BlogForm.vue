<template>
  <div class="flex flex-col sm:flex-row w-full mx-auto px-4">
    <div class="flex w-full sm:w-2/3 py-5 ">
      <div class="max-w-xl mx-auto" >
        <nuxt-link v-if="post.published" :to="{ name: 'blog-id', params: { 'id': post.id }}" class="float-right">View Post</nuxt-link>
        <InputField v-model="post.title" label="Title" name="title" @input="updateId"/>
        <Editor v-model="post.body" />
      </div>
    </div>
    <div class="flex flex-col w-full sm:w-1/3 mx-auto py-6 sm:pl-4 sm:border-l border-gray-500 border-opacity-25">
        <InputField v-model="post.id" label="Post ID" name="id" disabled/>
        <div class="mb-4 flex flex-col">
          <label>
            <input v-model="post.published" class="mr-2 leading-tight" type="checkbox">
            <span class="text-sm">Published</span>
          </label>
        </div>

        <TextareaField name="lead" v-model="post.lead" label="Post Subtitle"  />
        
        <TextareaField name="description" v-model="post.description" label="Description"  />
        
        <div class="mb-4 flex flex-col">
          <label class="block w-full text-sm uppercase font-bold">Image</label>
          <div v-if="post.imageUrl">
            <img :src="post.imageUrl" class="w-24 md:w-32 h-auto object-cover inline-block" alt="">
            <button
              v-if="post.imageUrl"
              :disabled="isDeletingImage"
              type="button"
              class="bg-red-500 border-red-300 text-white"
              @click="deleteImage"
            >
              {{ isDeletingImage ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
          <button
            v-if="!post.imageUrl"
            :disabled="isUploadingImage"
            type="button"
            @click="launchImageFile"
          >
            {{ isUploadingImage ? 'Uploading...' : 'Upload' }}
          </button>
          <input
            ref="imageFile"
            type="file"
            accept="image/png, image/jpeg"
            class="hidden"
            @change.prevent="uploadImageFile($event.target.files)"
          >
        </div>

        <InputField name="imageAlt" v-model="post.imageAlt" label="Image Alt"  />
        
        <TextareaField name="imageCaption" v-model="post.imageCaption" label="Image Caption"  />
        
        <InputField name="tags" v-model="tags" label="Tags"  />

        <div class="mb-4 flex justify-between">
          <div class="">
            <button
              :disabled="!!status"
              type="button"
              @click="submitForm"
              class="px-4 py-2"
            >
              {{ status ? status : 'Save' }}
            </button>
            <nuxt-link v-if="!post.published && post.id" :to="{ name: 'blog-id-preview', params: { 'id': post.id }}" class="px-4 py-2">Preview</nuxt-link>
            <nuxt-link v-if="post.published" :to="{ name: 'blog-id', params: { 'id': post.id }}" class="px-4 py-2">View Post</nuxt-link>
          </div>
          <div class="">
            <button
              type="button"
              class="px-4 py-2 bg-red-500 border-red-300 text-white"
              @click="confirmDelete"
            >
              Delete
            </button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'BlogForm',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      random: "Random",
      post: {
        id: "hello",
      },
      tags: '',
      status: '',
      originalId: '',
      isUploadingImage: false,
      isDeletingImage: false,
      FULL_IMAGE: {
        maxDimension: 1280,
        quality: 0.9
      },
      THUMB_IMAGE: {
        maxDimension: 640,
        quality: 0.7
      }
    }
  },
  computed: {
    // to avoid using this.$store.state.auth 
    ...mapState([
      'message',
      'loading',
    ])
  },
  watch: {
    value: {
      handler (newValue) {
        console.log(this.post)
        this.post = cloneDeep(newValue)
        this.tags = this.post.tags ? this.post.tags.join() : ''
      },
      immediate: true
    }
  },
  async mounted () {
    // save post id in case it is updated
    this.originalId = this.post.id
  },
  methods: {
    async submitForm () {
      if (!this.post.id) {
        console.log(this.post.id)
        // eslint-disable-next-line no-alert
        this.$store.commit('SET_MESSAGE', 'Please enter the blog ID.')
        this.$refs.id.focus()
        return
      }

      if (this.originalId !== this.post.id) {
        const exists = await this.checkExists(this.post.id)
        if (exists) {
          // eslint-disable-next-line no-alert
          alert('Blog ID already exists. Please enter a unique blog ID.')
          this.$refs.id.focus()
          return
        }
      }

      await this.updateValue()
    },
    async updateValue () {
      this.status = 'Saving...'

      const serverTimestamp = this.$fireModule.firestore.FieldValue.serverTimestamp()
      const db = this.$fire.firestore
      const blog = cloneDeep(this.post)

      const id = blog.id
      delete blog.id

      if (!blog.created) {
        blog.created = serverTimestamp
      }

      blog.changed = serverTimestamp

      blog.tags = this.tags.trim() !== '' ? this.tags.split(',').map(item => item.trim()) : []

      try {
        const firebaseQue = []
        const setBlogPost = db.collection('blogs').doc(id).set(blog)

        firebaseQue.push(setBlogPost)

        if (this.originalId && this.originalId !== id) {
          const deleteBlogPost = db.collection('blogs').doc(this.originalId).delete()
          firebaseQue.push(deleteBlogPost)
          this.$store.commit("DELETE_POSTS", blog)
        }
        await Promise.all(firebaseQue).then(() => {
          this.$store.commit("SET_POSTS", blog)
          this.$store.commit('SET_MESSAGE', "Post saved.")
        })

      } catch (error) {
        // eslint-disable-next-line no-alert
        // eslint-disable-next-line no-console
        console.error(error)
        this.$store.commit('SET_MESSAGE', error.message || 'Unable to save post!')
      }

      blog.id = id
      this.$emit('input', cloneDeep(blog))

      this.status = ''

      if (this.originalId !== id) {
        this.originalId = id

        this.$router.replace({
          name: 'blog-id-edit',
          params: {
            id: blog.id
          }
        })
      }
    },
    confirmDelete () {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Are you sure you want to delete this post?')
      if (result) {
        if (this.originalId) {
          const db = this.$fire.firestore
          const deleteBlogPost = db.collection('blogs').doc(this.originalId).delete()

          Promise.all([deleteBlogPost])
            .then(() => {
              // eslint-disable-next-line no-alert
              this.$store.commit('SET_MESSAGE', "Post deleted.")
              this.$store.commit("DELETE_POSTS", this.post)
              this.$router.push({
                path: '/admin'
              })
              return null
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error(error)
              // eslint-disable-next-line no-alert
              this.$store.commit('SET_MESSAGE', error.message || 'Unable to delete post!')
            })
        }
      }
    },
    updateId (e) {
      this.post.title = e
      this.post.id = this.slugify(e)
      return
    },
    async checkExists () {
      const db = this.$fire.firestore
      const documentSnapshot = await db.collection('blogs').doc(this.post.id).get()
      return documentSnapshot.exists
    },
    /**
     * @see https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
     */
    slugify (string) {
      const a =
        'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
      const b =
        'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
      const p = new RegExp(a.split('').join('|'), 'g')

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w-]+/g, '') // Remove all non-word characters
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    },
    launchImageFile () {
      this.$refs.imageFile.click()
    },
    async uploadImageFile (files) {
      if (!files.length) {
        return
      }
      const file = files[0]

      if (!file.type.match('image.*')) {
        // eslint-disable-next-line no-alert
        this.$store.commit('SET_MESSAGE', 'Please upload an image');
        return
      }

      const metadata = {
        contentType: file.type
      }

      const fullImageResizePromise = new Promise((resolve, reject) => {
        this.generateVariation(file, this.FULL_IMAGE.maxDimension, this.FULL_IMAGE.quality, resolve)
      })

      const thumbImageResizePromise = new Promise((resolve, reject) => {
        this.generateVariation(file, this.THUMB_IMAGE.maxDimension, this.THUMB_IMAGE.quality, resolve)
      })

      const images = await Promise.all([fullImageResizePromise, thumbImageResizePromise])

      const fullImageUploadPromise = this.uploadSingleImageFile(file.name, images[0], metadata)

      const thumbFileName = file.name.substring(0, file.name.lastIndexOf('.')) + '_thumb.' + file.name.substring(file.name.lastIndexOf('.') + 1)
      const thumbImageUploadPromise = this.uploadSingleImageFile(thumbFileName, images[1], metadata)

      this.isUploadingImage = true

      await Promise.all([fullImageUploadPromise, thumbImageUploadPromise])
        .then((results) => {
          this.post.imageUrl = results[0]
          this.post.teaserImageUrl = results[1]
          return null
        })
        .finally(() => {
          this.isUploadingImage = false
        })
    },
    uploadSingleImageFile (filename, blob, metadata) {
      const storage = this.$fire.storage
      const imageRef = storage.ref(`images/${filename}`)



      return imageRef.put(blob, metadata).then((snapshot) => {
        // eslint-disable-next-line promise/no-nesting
        return snapshot.ref.getDownloadURL().then((url) => {
          return url
        })
      }).catch((error) => {
        // eslint-disable-next-line no-console
        this.$store.commit('SET_MESSAGE', error.message || 'Unable to upload the image.')
      })
    },
    generateVariation (file, maxDimension, quality, cb) {
      const displayPicture = (url) => {
        const image = new Image()
        image.src = url
        image.onload = () => {
          const canvas = this.getScaledCanvas(image, maxDimension)
          canvas.toBlob(cb, 'image/jpeg', quality)
        }
      }

      const reader = new FileReader()
      reader.onload = e => displayPicture(e.target.result)
      reader.readAsDataURL(file)
    },
    getScaledCanvas (image, maxDimension) {
      const scaledCanvas = document.createElement('canvas')

      if (image.width > maxDimension || image.height > maxDimension) {
        if (image.width > image.height) {
          scaledCanvas.width = maxDimension
          scaledCanvas.height = (maxDimension * image.height) / image.width
        } else {
          scaledCanvas.width = (maxDimension * image.width) / image.height
          scaledCanvas.height = maxDimension
        }
      } else {
        scaledCanvas.width = image.width
        scaledCanvas.height = image.height
      }
      scaledCanvas
        .getContext('2d')
        .drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          scaledCanvas.width,
          scaledCanvas.height
        )
      return scaledCanvas
    },
    deleteImage () {
      this.isDeletingImage = true

      const storage = this.$fire.storage;

      const fullImageDeletePromise = storage.refFromURL(this.post.imageUrl).delete()
      const thumbImageDeletePromise = storage.refFromURL(this.post.teaserImageUrl).delete()

      return Promise.all([fullImageDeletePromise, thumbImageDeletePromise])
        .then(() => {
          this.post.imageUrl = ''
          this.post.teaserImageUrl = ''
          return null
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          this.$store.commit('SET_MESSAGE', error.message || 'Unable to delete the image.')

          if (error.code === 'storage/object-not-found') {
            this.post.imageUrl = ''
            this.post.teaserImageUrl = ''
          }
          // eslint-disable-next-line no-console
          console.error('Error deleting image', error)
        })
        .finally(() => {
          this.isDeletingImage = false
        })
    }
  }
}
</script>

<style scoped>
</style>
