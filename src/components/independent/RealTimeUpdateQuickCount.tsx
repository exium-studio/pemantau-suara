import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default function RealTimeUpdateQuickCount() {
  // Definisikan Pusher di window agar Echo dapat menggunakannya
  //@ts-ignore
  window.Pusher = Pusher;

  // Inisialisasi Echo dengan konfigurasi Pusher
  //@ts-ignore
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
  });

  // Mendengarkan event "quick-count-updated" di channel "quick-count-channel"
  //@ts-ignore
  const channel = window.Echo.channel("quick-count-channel");
  channel.listen("quick-count-updated", (data: any) => {
    alert(JSON.stringify(data));
  });

  return null;
}
