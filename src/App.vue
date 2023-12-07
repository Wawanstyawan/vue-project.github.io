<template>
  <div id="app">
    <div class="container">
      <div class="upload-image">
          <h2>Image Upload</h2>
          <input type="file" @change="handleFileChange" accept="image/*">
          <button @click="uploadImage">Upload</button>
          <div v-if="message" class="mt-3 alert alert-info">{{ message }}</div>
      </div>
      <div class="image-container">
        <div class="image-list">
          <div v-for="url in imageUrls" :key="url" class="image-item">
            <button @click="openImageModal(url)">
              <img :src="url" alt="Uploaded Image" class="image-thumbnail">
            </button>
          </div> 
        </div>
      </div>
    </div>

    <div v-if="selectedImageUrl" class="modal-overlay" @click="closeImageModal">
      <div class="modal">
        <img :src="selectedImageUrl" alt="Full Size Image" style="width: 100%;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      message: "",
      imageUrls: [],
      selectedImageUrl: "",
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedFile) {
        this.showMessage("Pilih file gambar terlebih dahulu", "warning");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/bmp", "image/gif"];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.showMessage("Hanya boleh file gambar (jpg, jpeg, bmp, png, gif)", "warning");
        return;
      }

      if (this.selectedFile.size > 2 * 1024 * 1024) {
        this.showMessage("File gambar terlalu besar (Max 2 MB)", "warning");
        return;
      }

      const formData = new FormData();
      formData.append("image", this.selectedFile);

      try {
        const response = await this.uploadToImgBB(formData);
        this.showMessage("Gambar berhasil diupload", "success");
        this.imageUrls.push(response.data.data.url);
        this.saveImageUrlsToLocal();
      } catch (error) {
        console.error(error);
        this.showMessage("Upload error", "danger");
      }
    },
    
    async uploadToImgBB(formData) {
      const apiKey = "478005cb1083f17f24ade4b30f846140";
      const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
      return await this.$axios.post(apiUrl, formData);
    },
    saveImageUrlsToLocal() {
      localStorage.setItem("imageUrls", JSON.stringify(this.imageUrls));
    },
    loadImageUrlsFromLocal() {
      const storedImageUrls = localStorage.getItem("imageUrls");
      if (storedImageUrls) {
        this.imageUrls = JSON.parse(storedImageUrls);
      }
    },
    showMessage(text, type) {
      this.message = text;
      setTimeout(() => {
        this.message = "";
      }, 3000); // Menampilkan pesan selama 3 detik
    },
    openImageModal(url) {
      this.selectedImageUrl = url;
    },
    closeImageModal() {
      this.selectedImageUrl = "";
    },
  },
  
  created() {
    this.loadImageUrlsFromLocal();
  }
};
</script>

<style>
*, :after, :before {
    border: 0 solid;
    box-sizing: border-box;
}
#app {
    height: 100%;
    margin: 0 auto;
    max-width: 1280px;
    width: 100%;
}
.upload-image {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.upload-image input[type="file"] {
  margin-top: 10px;
  width: 500px;
}

.upload-image button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.image-gallery img {
  max-width: 100%;
  height: auto;
  margin: 10px;
}

.image-container{
  box-sizing: border-box;
    font-weight: 400;
    margin: 0;
    padding: 0;
    position: relative;
    margin-top: 50px;
}

.image-list {
    grid-template-columns: repeat(4,1fr);
}

.image-list {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.image-item {
  position: relative;
  justify-self: center;
}

.image-thumbnail {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.alert-info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
  color: #0c5460;
}

.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
}

.alert-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
</style>
