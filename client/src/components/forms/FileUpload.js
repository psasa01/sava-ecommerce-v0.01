import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { CloseCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import { Image, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          1000,
          1000,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLAD RESPONSE DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR");
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images array in the parrent component - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        <Image.PreviewGroup>
          {values.images &&
            values.images.map((image) => (
              <div className="upload-image">
                {/* 
                <CloseCircleOutlined
                  className="icon-close"
                  style={{ color: "red" }}
                /> 
                */}

                <Image
                  className="image"
                  key={image._id}
                  src={image.url}
                  height={100}
                  width={100}
                />
                <Badge
                  className="badge"
                  count="X"
                  key={image.public_id}
                  onClick={() => handleImageRemove(image.public_id)}
                />
              </div>
            ))}
        </Image.PreviewGroup>
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Odaberite slike
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
