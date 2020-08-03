import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import Resizer from 'react-image-file-resizer';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { storage } from "../../utils/Firebase";
import { getCroppedImg } from "../../utils/ImageUtils";

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            imagePreviewUrl: null,
            croppedImageUrl: null,
            src: null,
            crop: {
                unit: '%',
                width: 30, //1024
                aspect: 16 / 9,
            },
        };
    }

    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        var _this = this;
        var reader = new FileReader();
        //Read the contents of Image File.
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {
            var image = new Image();
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            image.sizeArray = [
                [755, 450],
                [365, 450],
                [365, 212],
                [380, 380]
            ]
            //Validate the File Height and Width.
            image.onload = function (flag) {
                const srcInitial = this.src;
                if (this.height == 1024 || this.width == 1024) {
                // Blog from the image
                let byteString = atob(srcInitial.split(',')[1]);
                var mimeString = srcInitial.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                var src = new Blob([ab], { type: mimeString });
                _this.setState({ src: e.target.result });
                // Resize
                this.sizeArray.map(dim => {
                    Resizer.imageFileResizer(
                        src, dim[0], dim[1], 'JPEG', 100, 0,
                        uri => {
                            var result = '';
                            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            var charactersLength = characters.length;
                            for (var i = 0; i < 4; i++) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                            }
                            let filename = result + dim[0] + 'x' + dim[1];
                            const uploadTask = storage.ref('images/' + filename).put(uri);
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    // progress
                                },
                                (error) => {
                                    console.log(error);
                                }, () => {
                                    // complete function 
                                    storage.ref('images').child(filename).getDownloadURL().then((url, filename) => {
                                        if (!window.localStorage.getItem('images')) {
                                            window.localStorage.setItem('images', JSON.stringify([]));
                                        }
                                        let currentLS = window.localStorage.getItem('images');
                                        currentLS = JSON.parse(currentLS);
                                        currentLS.push(url);
                                        window.localStorage.setItem('images', JSON.stringify(currentLS))
                                    });
                                });
                        },
                        'blob'
                    );
                });
                } else {
                    alert(`Image size is ${this.width} * ${this.height}. Accepted size is 1024 * 1024`)
                }
            };
        }
    }

    handleResize = () => {
        console.log(this.state.selectedFile)
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        debugger;
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                this,
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    render() {
        const { src, crop, imagePreviewUrl, croppedImageUrl } = this.state;
        console.log(crop);
        let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
        if (imagePreviewUrl) {
            $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
        }
        console.log(src);
        return (
            <div>
                <NavBar showHeader={true} title={"Image Upload"} />
                <div className="App">
                    {/* could use better design and style  */}
                    <input type="file" name="avatar" onChange={this.fileChangedHandler} />
                    {$imagePreview}
                </div>
                <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onChange={newCrop => this.onCropChange(newCrop)}
                    onComplete={this.onCropComplete}
                    // style={{ maxWidth: '50%', maxHeight: "50%", justifyContent: "center" }}
                />
                <button disabled={!(crop == 1024 || crop == 1024)} style={{ marginLeft : "45%", marginTop : "2%"}} onClick={() => window.location.replace("/view-uploads")}>Submit</button>
                {/* {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: '100%', maxHeight: "100%" }} src={croppedImageUrl} />
                )} */}
            </div>
        )
    };
}

export default ImageUpload;