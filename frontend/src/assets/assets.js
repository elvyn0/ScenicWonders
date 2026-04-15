// Common
import upLoad from "./images/common/upload.png";
import sw_logo from "./images/common/sw_logo.jpg";
import inFlag from "./images/common/inflag.webp";
import stripe from "./images/common/stripe_logo.png";
import profile_icon from "./images/common/profile_icon.png";
import QR from "./images/common/QRcode.png";
import payment_Success from "./images/common/payment-success.jpg";
import payment_Cancel from "./images/common/payment-canceled.jpg";
import Error_404 from "./images/common/404_Error.jpg";

const assets = {
  // Common
  sw_logo,
  upLoad,
  inFlag,
  stripe,
  profile_icon,
  QR,
  payment_Success,
  payment_Cancel,
  Error_404,

  //Hearo slide image
  travel1B: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234400/travel1B_nembrc.jpg",
  keralaB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233683/keralaB_fpjpsu.jpg",
  nepalB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233872/nepalB_kiacac.jpg",
  lakshadweepB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233745/lakshadweepB_fg3kdi.jpg",
  himalayaB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233658/himalayaB_dijzkf.jpg",
  goaB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233526/goaB_atzjaz.jpg",
  hampiB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233527/hampiB_q4bdnm.jpg",
  ootyB: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233975/ootyB_rpdsoa.jpg",

  //Explore Place categories
  kerala: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233662/kerala_he582a.jpg",
  punjab: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234003/punjab_eg9ldg.jpg",
  rajasthan: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234078/rajasthan_ns6xcu.jpg",
  maharashtra: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233765/maharashtra_t5ycmj.jpg",
  tamilNadu: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234278/tamilNadu_x3iam4.jpg",
  nepal: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233861/nepal_vgfmjo.jpg",

  // States Page images
  nepalBanner: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233884/nepalBanner_wkljkn.jpg",
  nepalKathmanduValley:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233914/nepalDestinationKathmandu_Valley_cttptj.jpg",
  nepalPokhara:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233954/nepalDestinationPokhara_k7svg4.jpg",
  nepalPokhara1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233968/nepalDestinationPokhara1_ykdvxl.jpg",
  nepalEverestBase:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233898/nepalDestinationAnnapurna_Circuit_cn8lw7.jpg",
  nepalChitwan:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233906/nepalDestinationChitwan_National_Park_jumqqx.jpg",
  nepalLumbini:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233925/nepalDestinationLumbini_ltnzzo.jpg",
  nepalLumbini1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1775856041/social_media_posts/g8oknp2wqlwm1bjkshqh.jpg",
  KeralaAllapy:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233676/keralaAlleppey_xai321.jpg",
  keralaKochi: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233693/keralaKochi_ds33vf.jpg",
  keralaThekkady:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233732/keralaThekkady_q4kmi0.jpg",
  keralaWayanad1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233739/keralaWayanad1_qmiqzd.jpg",
  KeralaMunnar: "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233701/keralaMunnar_zbt8b5.jpg",
  KeralaMunnar1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233724/keralaMunnar1_oyn416.jpg",
  tamilNaduMadurai:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234331/tamilnaduMadurai_nwkpoa.jpg",
  tamilNaduMadurai2:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234349/tamilnaduMadurai2_nipux7.jpg",
  tamilNaduOoty1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234363/tamilnaduOoty1_zx1ira.jpg",
  tamilNaudDhanushkodi:
    "https://res.cloudinary.com/elvyncloud/image/f_auto,q_auto/upload/v1776234303/tamilnaduDhanushkodi_wurecz.jpg",
  tamilNaduRameshwaram:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234375/tamilnaduRameshwaram_k0vdzy.jpg",
  tamilNaduShoreTemple:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234386/tamilnaduShoreTemple_sxpaie.jpg",
  tamilNadukanyakumari:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234319/tamilnaduKanyakumari_lrspzg.jpg",
  tamilNaduMahabalipuram:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234358/tamilnaduMahabalipuram_mrrayx.jpg",
  maharashtraMumbai:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233833/maharashtraMumbai_urndtq.jpg",
  maharashtraMumbai1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233844/maharashtraMumbai1_dd0xro.jpg",
  maharashtraLonavala1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233814/maharashtraLonavala1_gjstgc.jpg",
  maharashtraKhandala:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233808/maharashtraKhandala_grk0am.jpg",
  maharashtraMahabaleshwar:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233824/maharashtraMahabaleshwar_hhrymm.jpg",
  maharashtraMahabaleshwar1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233760/maharahstraMahabaleshwar1_yvwijq.jpg",
  maharashtraAjantaAndElloraCaves:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233780/maharashtraAjantaandElloraCaves_lmxi9r.jpg",
  maharashtraAjantaAndElloraCaves1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233791/maharashtraAjantaandElloraCaves1_tfjnrm.jpg",
  maharashtraAjantaAndElloraCaves2:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233795/maharashtraAjantaandElloraCaves2_vuiqp3.jpg",
  maharashtraTadobaAndhariTigerReserve1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776233851/maharashtraTadobaAndhariTigerReserve1_cr9utu.jpg",
  punjabAmritsar:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234014/punjabAmritsar_recwbv.jpg",
  punjabChandigarh:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234062/punjabChandigarh_bbsjoc.jpg",
  punjabAnandpurSahib:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234024/punjabAnandpurSahib_zodeyd.jpg",
  punjabAnandpurSahib1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234053/punjabAnandpurSahib1_e4qvwb.jpg",
  rajasthanjaipur:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234103/rajasthanJaipur_gawyd6.jpg",
  rajasthanUdaipur:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234290/rajasthanUdaipur_xiur7w.jpg",
  rajasthanJodhpur:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234132/rajasthanJodhapur_yv6gkm.jpg",
  rajasthanJaisalmer:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234109/rajasthanJaisalmer_lqdepn.jpg",
  rajasthanJaisalmer1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234129/rajasthanJaisalmer1_hqouoh.jpg",
  rajasthanRanthambore:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234161/rajasthanRanthambore_my0ucb.jpg",
  rajasthanRanthambore1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234179/rajasthanRanthambore1_fwa5p5.jpg",
  RajasthanIntex:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234080/rajasthanIndex_dxujel.jpg",
  rajasthanJodhpur1:
    "https://res.cloudinary.com/elvyncloud/image/upload/f_auto,q_auto/v1776234129/rajasthanJaisalmer1_hqouoh.jpg",
};

export default assets;
