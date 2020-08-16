import Head from "next/head";
import axios from "axios";
import Error from "next/error";
import Link from "next/link";
import { DatePicker } from "antd";
import moment from "moment";
import Router from "next/router";

const Home = props => {
  if (props.e) {
    return <Error statusCode={500} title={props.e.message} />;
  }
  if (props.data.faultInfo) {
    return <Error statusCode={500} title={props.data.faultInfo.message} />;
  }
  return (
    <div>
      <Head>
        <title>Box Office</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>박스 오피스</h1>
      <DatePicker
        defaultValue={moment(props.targetDt, "YYYYMMDD")}
        dateFormat={"YYYYMMDD"}
        onChange={date => Router.push(`/?targetDt=${date.format("YYYYMMDD")}`)}
      />
      {props.data.boxOfficeResult.dailyBoxOfficeList.map(item => (
        <div key={item.movieCd}>
          [{item.rank}]{" "}
          <Link href="/movies/[code]" as={"/movies/" + item.movieCd}>
            <a>{item.movieNm}</a>
          </Link>{" "}
          <small>({item.openDt})</small>
        </div>
      ))}
    </div>
  );
};

Home.getInitialProps = async context => {
  const targetDt = context.query.targetDt || moment().subtract(1, "day").format("YYYYMMDD");
  let url = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
  url += "?key=10a42b2c4a97462ff4b046b617627835";
  url += `&targetDt=${targetDt}`;

  try {
    const { data } = await axios.get(url);
    return {
      targetDt,
      data,
    };
  } catch (e) {
    console.warn(e);
    return { e };
  }
};

export default Home;
