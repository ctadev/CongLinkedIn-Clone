import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import s from "./news.module.scss";
import { useSelector } from "react-redux";
import TimeAgo from "timeago-react";
import { v4 as uuidv4 } from "uuid";

function News({ articles }) {
  const theme = useSelector((state) => state.theme);

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;

  return (
    <main className={!theme ? s.news : `${s.news} ${s.dark}`}>
      <section className={s.sec1}>
        <div className={s.title}>
          <h1>LinkedIn News</h1>
          <InfoIcon />
        </div>

        {articles.slice(0, 5).map((news) => (
          <div className={s.newsItem} key={uuidv4()}>
            <div className={s.item}>
              <FiberManualRecordIcon className={s.icon} />
              <div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={news.url}
                >
                  <h2>{truncate(news.title, 35)}</h2>
                </a>
                <p>
                  <TimeAgo datetime={news.publishedAt} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section></section>
    </main>
  );
}

export default News;
