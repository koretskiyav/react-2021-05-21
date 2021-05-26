import { useEffect, useState } from 'react';
import Menu from '../menu';
import Reviews from '../reviews';

import style from './restaurant.module.css';

const Tabs = {
  MENU: 'MENU',
  REVIEWS: 'REVIEWS',
};

function Restaurant({ restaurant: { menu, reviews } }) {
  const [activeTab, setActiveTab] = useState(Tabs.MENU);

  useEffect(() => {
    setActiveTab(Tabs.MENU);
  }, [menu, reviews]);

  const activeTabView = () => {
    switch (activeTab) {
      case Tabs.MENU:
        return <Menu menu={menu} />;
      case Tabs.REVIEWS:
        return <Reviews reviews={reviews} />;
      default:
        return <Menu menu={menu} />;
    }
  };

  return (
    <>
      <div className={style['buttons-group']}>
        <button
          data-id={Tabs.MENU}
          onClick={(evt) => setActiveTab(evt.target.dataset.id)}
        >Menu</button>
        <button
          data-id={Tabs.REVIEWS}
          onClick={(evt) => setActiveTab(evt.target.dataset.id)}
        >Reviews</button>
      </div>
      { activeTabView() }
    </>
  );
}

export default Restaurant;
