import { DeleteOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Tooltip, Upload } from 'antd';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const MultiImageUpload = ({
  previewImageUrl,
  setPreviewImageUrl,
  previewImage,
  setPreviewImage,
  fileList,
  setFileList
}) => {
  const handlePreview = async (file) => {
    debugger
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageUrl(file.url || file.preview);
  };
  const handleChange = ({ fileList: newFileList }) => {
    const checkPrimery = fileList?.filter((val) => val.primery);
    const makePrimery = newFileList?.map((val, index) => {
      if (checkPrimery?.length) {
        if (val.uid === checkPrimery[0].uid) {
          return val;
        } else {
          val['primary'] = false;
          return val;
        }
      } else {
        if (index === 0) {
          val['primary'] = true;
          return val;
        } else {
          val['primary'] = false;
          return val;
        }
      }
    });
    const slicedArray = makePrimery.slice(0, 5);
    setFileList(slicedArray);
    setPreviewImage(slicedArray[0]);
    handlePreview(slicedArray[0]);
  };
  const uploadButton = fileList?.length ? (
    <div>
      <PlusOutlined />
    </div>
  ) : (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
        className="d-flex flex-column text-muted"
      >
        <span> Drag image(s) here or</span>
        <span className="text-primary">Browser image</span>
        <span>
          {' '}
          <InfoCircleOutlined /> you can add up to 5 images
        </span>
      </div>
    </div>
  );
  const handlePreviewImage = (file) => {
    setPreviewImage(file);
    handlePreview(file);
  };
  const handleChangePrimery = () => {
    const makePrimery = fileList?.map((val) => {
      if (val.uid === previewImage.uid) {
        val.primery = true;
        return val;
      } else {
        val.primery = false;
        return val;
      }
    });
    setFileList(makePrimery);
    const filterCurrentPreview = fileList?.filter((val) => val.uid === previewImage.uid);
    setPreviewImage(filterCurrentPreview[0]);
    handlePreview(filterCurrentPreview[0]);
  };
  const handleDelete = () => {
    const filterDeleteItem = fileList?.filter((val) => val.uid !== previewImage.uid);
    if (filterDeleteItem?.length) {
      if (previewImage.primery) {
        filterDeleteItem[0].primery = true;
        setFileList(filterDeleteItem);
        setPreviewImage(filterDeleteItem[0]);
        handlePreview(filterDeleteItem[0]);
      } else {
        setFileList(filterDeleteItem);
        setPreviewImage(filterDeleteItem[0]);
        handlePreview(filterDeleteItem[0]);
      }
    } else {
      setFileList([]);
      setPreviewImage('');
      setPreviewImageUrl('');
    }
  };

  return (
    <>
      {previewImageUrl && (
        <div
          className="w-100 mb-2 p-2 bg-white rounded-3 border border-2 preview-image"
          style={{ width: '200px', height: '210px' }}
        >
          <Image
            alt="example"
            style={{
              width: '100%',
              height: '150px'
            }}
            src={previewImageUrl}
          />
          <div className="w-100 d-flex justify-content-between align-items-center p-2">
            {previewImage?.primery ? (
              <div className="d-flex align-items-center gap-1">
                <span className="bg-light p-1 rounded-3" style={{ fontSize: 'small' }}>
                  <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#11bc83' }} /> Primary
                </span>
                <Tooltip
                  placement="rightTop"
                  title="This image will be displayed in all your transaction for this item"
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </div>
            ) : (
              <span
                className="text-primary "
                style={{ cursor: 'pointer' }}
                onClick={() => handleChangePrimery()}
              >
                Make as a primary
              </span>
            )}
            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDelete()} />
          </div>
        </div>
      )}
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        className={`upload-image-container ${fileList?.length ? 'customize-upload-button' : 'upload-image-box'
          }`}
        itemRender={(file, fileList) => (
          <img
            className={fileList.uid === previewImage.uid && 'upload-image-list-item-active'}
            src={fileList.thumbUrl}
            onClick={() => handlePreviewImage(fileList)}
            style={{ cursor: 'pointer' }}
            width={25}
            height={25}
            alt=''
          />
        )}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
    </>
  );
};
export default MultiImageUpload;
