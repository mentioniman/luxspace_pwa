import React from 'react';


import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Clients from "./components/Clients.js";
import Modal from "./components/Modal.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";
import Offline from "./components/Offline.js";



function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);

  function handleOfflineStatus() {
    console.log(!navigator.onLine);
    setOfflineStatus(!navigator.onLine);
  }
  function handleShowModal(event) {
    setShowModal(!showModal);
  }
  React.useEffect(
    function () {
      (async function () {
        const response = await fetch(
          "https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc",
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              "x-api-key": process.env.REACT_APP_APIKEY,
            },
          }
        );
        const { nodes } = await response.json();
        setItems(nodes);
      })();

      handleOfflineStatus();
      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

      return function cleanup() {
        window.removeEventListener("online", handleOfflineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
      };
    },
    [offlineStatus]
  );
  return (
    <>
     
      <Header />
      <Hero />
      <Browse />
      <Arrived  />
      <Clients />
      <AsideMenu />
      <Footer />
      {showModal && <Modal handleShowModal={handleShowModal} />}
    </>
  );
}

export default App;
