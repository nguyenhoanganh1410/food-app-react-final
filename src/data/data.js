import { AiOutlineHome } from 'react-icons/ai';
import { FaRegNewspaper, FaBars } from 'react-icons/fa';
import { IoStorefrontOutline } from 'react-icons/io5';
import { GiKnifeFork } from 'react-icons/gi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import banner01 from '../imgage/banner-01.jpg'; // gives image path
import banner02 from '../imgage/banner-02.jpg'; // gives image path
import banner03 from '../imgage/banner-03.jpg'; // gives image path

import order_01 from '../imgage/order_1.jpg'; // gives image path
import arrow_01 from '../imgage/arr1.png'; // gives image path
import order_02 from '../imgage/order_2.jpg'; // gives image path
import arrow_02 from '../imgage/arr2.png'; // gives image path
import order_03 from '../imgage/order_3.jpg'; // gives image path
import arrow_03 from '../imgage/arr3.png'; // gives image path
import order_04 from '../imgage/order_4.jpg'; // gives image path

import bestsell01 from '../imgage/bestsell01.png'; // gives image path
import bestsell02 from '../imgage/bestsell02.png'; // gives image path
import bestsell03 from '../imgage/bestsell03.png'; // gives image path

import review01 from '../imgage/review01.jpg'; // gives image path
import review02 from '../imgage/review02.jpg'; // gives image path
import review03 from '../imgage/review03.jpg'; // gives image path

//category filter
import burger from '../imgage/burger.svg';
import bread from '../imgage/bread.svg';
import sandwiches from '../imgage/snadwind.svg';
import drinks from '../imgage/drinks.svg';
import pizzas from '../imgage/pizza.svg';

export const nav = [
  {
    id: 'data-nav_pages',
    icon: <AiOutlineHome />,
    text: 'Trang chủ',
    link: '/',
  },
  {
    id: 'data-nav_order',
    icon: <GiKnifeFork />,
    text: 'Đặt đơn ngay',
    link: '/category/burgers',
  },
  {
    id: 'data-nav_news',
    icon: <FaRegNewspaper />,
    text: 'Tin tức',
    link: '',
  },
  {
    id: 'data-nav_stores',
    icon: <IoStorefrontOutline />,
    text: 'Cửa hàng',
    link: '',
  },
];

export const banner = [
  {
    id: 1,
    img: banner01,
    text: 'THƯỞNG THỨC BỮA ĂN CỦA BẠN',
    title: 'Good food is wise',
    red: 'medicine',
  },
  {
    id: 2,
    img: banner02,
    text: 'HAPPY YOUR SPECIAL',
    title: 'Love at first',
    red: 'bite',
  },
  {
    id: 3,
    img: banner03,
    text: 'GOOD FOOD IS GOOD MOOD',
    title: 'The belly rules the',
    red: 'mind',
  },
];

export const howWorks = [
  {
    id: 'howWork1',
    img: order_01,
    img_arrow: arrow_01,
    title: 'Lựa chọn sản phẩm yêu thích của bạn',
  },
  {
    id: 'howWork2',
    img: order_02,
    img_arrow: arrow_02,
    title: 'Chúng tôi sẽ xử lý vào giao trong thời gian sớm nhất cho bạn',
  },
  {
    id: 'howWork3',
    img: order_03,
    img_arrow: arrow_03,
    title: 'Thanh toán trên đơn hàng của bạn',
  },
  {
    id: 'howWork4',
    img: order_04,
    img_arrow: arrow_01,
    title: 'Hãy thưởng thức món ăn tuyệt vời của chúng tôi',
  },
];

export const data_ingredients = [
  {
    id: 'ingredients_01',
    number: 1,
    text: 'Pataks Butter Chicken Mild là nước sốt cà ri kem vị cà chua và bơ',
    title: 'Bơ',
  },
  {
    id: 'ingredients_02',
    number: 2,
    text: 'Nhận những lát thịt bò chất lượng tại Tesco. Mua sắm tại cửa hàng hoặc trực tuyến',
    title: 'Thịt bò lát',
  },
  {
    id: 'ingredients_03',
    number: 3,
    text: 'Những củ hành xanh có hình dáng thẳng và mảnh',
    title: 'Hành tây',
  },
  {
    id: 'ingredients_04',
    number: 4,
    text: ' Bánh mì tự làm giàu dinh dưỡng hơn bánh mì mua ở cửa hàng',
    title: 'Bánh mì tươi',
  },
  {
    id: 'ingredients_05',
    number: 15,
    text: 'Pataks Butter Chicken Mild là nước sốt cà ri kem vị cà chua và bơ',
    title: 'Bơ',
  },
  {
    id: 'ingredients_06',
    number: 6,
    text: 'Thật tuyệt vời!',
    title: 'Phô mai',
  },
];

export const data_bestSeller = [
  {
    id: 'bestseller1',
    name: 'crary Burger',
    price: '$20.00',
    content:
      ' The width and height of the window will be shown on the page, and it will change as the size of the window is changed.',
    imgage: bestsell01,
  },
  {
    id: 'bestseller2',
    name: 'crary Burger',
    price: '$10.00',
    content:
      ' The width and height of the window will be shown on the page, and it will change as the size of the window is changed.',
    imgage: bestsell02,
  },
  {
    id: 'bestseller3',
    name: 'crary Burger',
    price: '$20.00',
    content:
      ' The width and height of the window will be shown on the page, and it will change as the size of the window is changed.',
    imgage: bestsell03,
  },
];

export const data_analysis = [
  {
    id: 'analysis1',
    number: 350,
    title: 'Ly cafe',
  },
  {
    id: 'analysis2',
    number: 2340,
    title: 'Đơn hàng mỗi ngày',
  },
  {
    id: 'analysis3',
    number: 60,
    title: 'Đầu bếp chuyên nghiệp',
  },
  {
    id: 'analysis4',
    number: 35,
    title: 'Sandwichs mỗi giờ',
  },
];

export const data_reviews = [
  {
    id: 'review01',
    img: review01,
    name: 'mark zuckerberg',
    role: 'Co-founding Facebook, Inc',
    text: 'I chose food G because of their value And incredible superior customer Service they really awesome Food with quality service Ha of their value And incredible sup with quality',
  },
  {
    id: 'review02',
    img: review02,
    name: 'rose',
    role: 'Co-founding Facebook, Inc',
    text: 'I chose food G because of their value And incredible superior customer Service they really awesome Food with quality service Ha of their value And incredible sup with quality',
  },
  {
    id: 'review03',
    img: review03,
    name: 'tim cook',
    role: 'Ceo of Apple',
    text: 'I chose food G because of their value And incredible superior customer Service they really awesome Food with quality service Ha of their value And incredible sup with quality',
  },
];

export const filler_food = [
  {
    id: 'filter_food01',
    img: burger,
    text: 'burgers',
    url: 'burgers'
  },
  // {
  //   id: 'filter_food02',
  //   img: bread,
  //   text: 'breads',
  // },
  {
    id: 'filter_food03',
    img: sandwiches,
    text: 'sandwiches',
    url: 'sandwiches'
  },
  {
    id: 'filter_food04',
    img: drinks,
    text: 'Đồ uống',
    url: 'drinks'
  },
  {
    id: 'filter_food05',
    img: pizzas,
    text: 'pizzas',
    url: 'pizzas'
  },
];

export const filterPriceDropList = [
  {
    id: 'filterPriceDropList1',
    text: 'Gía: Thấp tới Cao',
    value: 'asc'
  },
  {
    id: 'filterPriceDropList2',
    text: 'Gía: Cao tới Thấp',
    value: 'desc'
  },
  // {
  //   id: 'filterPriceDropList3',
  //   text: 'rate: low to hight',
  // },
  // {
  //   id: 'filterPriceDropList4',
  //   text: 'rate: hight to low',
  // },
];
