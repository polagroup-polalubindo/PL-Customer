import React, { Component, useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import useStyles from "./styles";
import banner_1 from "./assets/Banner1-280.jpg";
import banner_2 from "./assets/Banner2-280.jpg";
import banner_3 from "./assets/Banner3-280.jpg";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/globalState";

export default function SimpleSlider() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  const { refCode, dataVoucher, fetchVoucher, baseUrl } = useContext(Context);
  const [voucher, setVoucher] = useState([])

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      await fetchVoucher()
    }
    fetch()
  }, [])

  useEffect(() => {
    let temp = []

    dataVoucher.forEach(el => {
      if (el.banner) temp.push(el)
    })
    setVoucher(temp)
  }, [dataVoucher])

  return (
    <>
      <Slider {...settings} arrows={false}>
        <div style={{ margin: 15 }}>
          <img src={banner_1} className={classes.img} alt="banner1" />
        </div>
        <div>
          <img src={banner_2} className={classes.img} alt="banner2" />
        </div>
        <div>
          <img
            src={banner_3}
            className={classes.img}
            onClick={() => history.push(refCode ? `/s&k?ref=${refCode}` : "/s&k")}
            alt="banner2"
          />
        </div>
        {
          voucher.map((el, index) =>
            <div>
              <img src={`${baseUrl}/${el.banner}`} className={classes.img} alt={"voucher" + index} />
            </div>
          )
        }
      </Slider>
    </>
  );
}
