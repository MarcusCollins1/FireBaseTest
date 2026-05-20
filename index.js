import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { getAnalytics  } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_CXSZVz6meJgcJyktktWNmPtLmeFNXn0",
    authDomain: "marcus-collins-github-website.firebaseapp.com",
    projectId: "marcus-collins-github-website",
    storageBucket: "marcus-collins-github-website.firebasestorage.app",
    messagingSenderId: "328004594228",
    appId: "1:328004594228:web:bb8761e36212abfbbbf861",
    measurementId: "G-VNQCWGZTJD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app)

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    await addDoc(collection(db, "messages"), {
        name,
        message,
        createdAt: serverTimestamp()
    });

    e.target.reset()
    alert("Saved!");
});

document.getElementById("loadMessages").addEventListener("click", loadMessages);

async function loadMessages() {
    const list = document.getElementById("messages");
    list.innerHTML = "";

    const q = query(collection(db, "messages"), orderby("createdAt", "desc"));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.name}:${data.message}`;
        list.appendChild(li);
    });
}
