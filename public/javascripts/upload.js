(function() {
    var uploadPanel = document.getElementById('upload-main-panel');
    var addButton = document.getElementById('add-image');
    var inputFile = document.getElementById('upload');
    var uploadBtn = document.getElementById('uploadBtn');
    var fileList = [];

    inputFile.onchange = function() {
        var file = inputFile.files[0];
        var reader = new FileReader();
        if (file) {

            var fileName = file.name;
            var fileIndex = fileList.findIndex((value) => value.fileName === fileName);
            if (fileIndex === -1) {
                reader.readAsDataURL(file);
                reader.onload = function(res) {
                    addfile(res, fileName);
                    console.log("success")
                }
            } else {
                console.log('exist')
            }

        }

    }
    uploadBtn.onclick = function() {
        uploadFiles();
    }

    addButton.onclick = function(e) {
        e.stopPropagation();
        inputFile.click();
    }
    uploadPanel.onclick = function(e) {
        var event = e || window.event;
        event.stopPropagation();
        if (event.target.getAttribute('class') === 'delete-operate') {
            var fName = event.target.parentElement.getAttribute('data');
            removefile(fName);
        }
    }

    function addfile(res, fileName) {
        var pictureDiv = document.createElement('div');
        pictureDiv.setAttribute('class', 'image-contain');
        var img = document.createElement('img');
        var deleteDiv = document.createElement('div');
        deleteDiv.setAttribute('class', 'delete-operate');
        deleteDiv.innerHTML = 'x';
        img.setAttribute('class', 'pic-preview');
        img.src = res.currentTarget.result;
        pictureDiv.appendChild(img);
        pictureDiv.appendChild(deleteDiv);
        uploadPanel.insertBefore(pictureDiv, addButton);
        pictureDiv.setAttribute('data', fileName);
        fileList.push({
            fileName: fileName,
            data: res.currentTarget.result
        });
    }

    function removefile(fName) {
        var fileIndex = fileList.findIndex((value) => value.fileName === fName);
        if (fileIndex > -1) {
            var lcell = fileList[fileIndex].fileName;
            fileList = fileList.slice(0, fileIndex).concat(fileList.slice(fileIndex + 1));
            var deletedDiv = uploadPanel.querySelector(`[data="${lcell}"]`);
            uploadPanel.removeChild(deletedDiv);
            var newInputFile = inputFile.clo neNode(false);
            newInputFile.onchange = inputFile.onchange;
            inputFile = newInputFile;
        }
    }

    function uploadFiles() {
        if (!fileList.length) {
            return false
        }
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open('POST', '/op-upload', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var nodes = Array.from(uploadPanel.childNodes);
                for (let node of nodes) {
                    uploadPanel.removeChild(node);
                }
                var successDiv=document.createElement('div');
                successDiv.setAttribute('class','upload-success');
                successDiv.innerHTML='success';
                uploadPanel.appendChild(successDiv);
            }
        };
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        var str = `data=${encodeURIComponent(JSON.stringify(fileList))}`
        xhr.send(str);
    }

})();
