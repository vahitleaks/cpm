
class FileInput {
  constructor(wrapperEl) {
    this.wrapperEl = wrapperEl
    this.fileInput = wrapperEl.querySelector('input[type="file"]')
    this.uploadCta = wrapperEl.querySelector('.upload-cta')
    this.selectedFileList = wrapperEl.querySelector('.selected-files')
    this.fileInput.addEventListener('change', (e) => {
      this.handleFileChange(e)
    })
  }
  buildSelectedFileElement(file, fileId) {
      let selectedFileEl = document.createElement('li')
    let text = document.createTextNode(file.name)
    let removeButton = document.createElement('button')
    
    removeButton.setAttribute('role', 'button')
    removeButton.classList.add('remove')
    removeButton.innerText = 'Remove'
    removeButton.addEventListener('click', () => {
      selectedFileEl.parentNode.removeChild(selectedFileEl)
      this.removeFile(fileId)
    })
    
    selectedFileEl.appendChild(text)
    selectedFileEl.appendChild(removeButton)
    
    return selectedFileEl
  }
}
class SingleFileInput extends FileInput {
  constructor(wrapperEl) {
    super(wrapperEl) 
    this.selectedFile = null
  }
  handleFileChange(e) {
    let filesFromInput = e.target.files
    this.selectedFileList.innerHTML = ''
    if (filesFromInput.length < 1) {
      this.selectedFile = null
      return
    }
    this.disableUploadCta()
    this.selectedFile = filesFromInput[0]
    let selectedFileEl = this.buildSelectedFileElement(filesFromInput[0])
    this.selectedFileList.appendChild(selectedFileEl)
    e.target.value = ''
  }     
  disableUploadCta() {
    this.uploadCta.classList.add('hide')
    this.fileInput.disabled = true
  }
  enableUploadCta() {
    this.uploadCta.classList.remove('hide')
    this.fileInput.disabled = false
  }
  removeFile() {
    this.selectedFile = null
    this.enableUploadCta()
  }
}
class MultipleFileInput extends FileInput {
  constructor(wrapperEl) {
    super(wrapperEl)
    
    this.selectedFiles = {}
    this.nextFileId = 1
  }
  handleFileChange(e) {
    let filesFromInput = e.target.files
    
    for (let i = 0; i < filesFromInput.length; i++) {
      let file = filesFromInput[i]
      let fileId = this.nextFileId++
      
      this.selectedFiles[fileId] = file
      
      let selectedFileEl = this.buildSelectedFileElement(file, fileId)
      this.selectedFileList.appendChild(selectedFileEl)
    }
    
    e.target.value = ''
  }
  
  removeFile(fileId) {
    delete this.selectedFiles[fileId]
  }
}

// Single file input
document.querySelectorAll('.file-input.single').forEach(function(wrapperEl) {
  new SingleFileInput(wrapperEl)
})

// Multiple file input
document.querySelectorAll('.file-input.multiple').forEach(function(wrapperEl) {
  new MultipleFileInput(wrapperEl)
})