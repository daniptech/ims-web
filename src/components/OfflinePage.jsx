import { Image } from 'antd';
import React from 'react';
import { Images } from '../controller/Images';

const OfflinePage = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <Image src={Images.offlineimg} alt="" />
      <video src={Images.errorImage} playsinline autoplay loop type="video/mp4" />
    </div>
  );
};

export default OfflinePage;
