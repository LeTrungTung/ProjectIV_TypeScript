import React from "react";
import banner1 from "../../assets/images/banner1.jpg";
import right1 from "../../assets/images/scandinavian-bedroom-917ad89c.png";
import right2 from "../../assets/images/deck-of-dreams-fb527bf1.png";
import bottom1 from "../../assets/images/serve-my-drinks-263547ea.png";
import bottom2 from "../../assets/images/bathroom-upgrade-48ebb8fc.png";
import "./Banner1.css";
const Banner1: React.FC = () => {
  return (
    <div id="banner1">
      <div id="left-banner1">
        <h1>Lưu ý tưởng bạn thích</h1>
        <p>Thu thập nội dung bạn yêu thích</p>
        <p>để bạn có thể quay lại xem sau.</p>
        <button>Khám phá</button>
      </div>
      <div id="right-banner1">
        <div id="area-top">
          <img src={banner1} alt="" id="img-main1" />
          <div id="area-top-right">
            <img src={right1} alt="" id="img-right1" />
            <img src={right2} alt="" id="img-right2" />
          </div>
        </div>
        <div id="area-bottom">
          <img src={bottom1} alt="" id="img-bottom1" />
          <img src={bottom2} alt="" id="img-bottom2" />
        </div>
      </div>
    </div>
  );
};

export default Banner1;
