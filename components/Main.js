import s from "./main.module.scss";
import SideBar from "./SideBar";
import Middle from "./Middle";
import News from "./News";
import HomeNav from "./HomeNav";
import Modal from "./Modal";
import Overlay from "./Overlay";
import { useSelector } from 'react-redux';
import Zoom from './Zoom';
import Overlay2 from "./Overlay2";
import Loading from "./Loading";

function Main({ posts, articles }) {
  const theme = useSelector((state) => state.theme);

  return (
    <main className={!theme ? s.content : `${s.content} ${s.dark}`}>
      <HomeNav />
      <div className={s.middlecontent}>
        <section className={s.middlePost}>
          <SideBar />
          <Middle posts={posts} />
          <News articles={articles}/>
        </section>
      </div>
      <Modal />
      <Overlay />
      <Overlay2 />
      <Zoom />
      <Loading />
    </main>
  );
}

export default Main;
