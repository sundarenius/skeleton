import { store } from "@/redux/store";

const Session = () => {
  console.log(store.getState().context.drawerLeft); // just to showcase
  return (
    <div id="session-container">
      <p>Logged in start</p>
    </div>
  )
}

export default Session;
