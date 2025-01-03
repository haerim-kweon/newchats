import "regenerator-runtime/runtime"; // if needed for async/await in older browsers

const chatContainer = document.getElementById("chat-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");
const apiSelector = document.getElementById("api-selector");
const newChatBtn = document.getElementById("new-chat-btn");

const BASE_URL = process.env.API_ENDPOINT;

let db;

async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myChatDB", 1);
    request.onupgradeneeded = function (e) {
      db = e.target.result;
      if (!db.objectStoreNames.contains("chats")) {
        db.createObjectStore("chats", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("metadata")) {
        db.createObjectStore("metadata", { keyPath: "key" });
      }
    };
    request.onsuccess = function (e) {
      db = e.target.result;
      resolve();
    };
    request.onerror = function (e) {
      reject(e);
    };
  });
}

async function saveMessage(role, content) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("chats", "readwrite");
    const store = tx.objectStore("chats");
    store.add({ role, content });
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e);
  });
}

async function getAllMessages() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("chats", "readonly");
    const store = tx.objectStore("chats");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e);
  });
}

async function saveMetadata(key, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("metadata", "readwrite");
    const store = tx.objectStore("metadata");
    store.put({ key, value });
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e);
  });
}

async function getMetadata(key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("metadata", "readonly");
    const store = tx.objectStore("metadata");
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ? req.result.value : null);
    req.onerror = (e) => reject(e);
  });
}

async function clearAllData() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["chats", "metadata"], "readwrite");
    tx.objectStore("chats").clear();
    tx.objectStore("metadata").clear();
    tx.oncomplete = () => resolve();
    tx.onerror = (e) => reject(e);
  });
}

function createMessageBubble(content, sender = "user") {
  const wrapper = document.createElement("div");
  wrapper.classList.add("mb-6", "flex", "items-start", "space-x-3");

  const avatar = document.createElement("div");
  avatar.classList.add(
    "w-10",
    "h-10",
    "rounded-full",
    "flex-shrink-0",
    "flex",
    "items-center",
    "justify-center",
    "font-bold",
    "text-white"
  );

  if (sender === "assistant") {
    avatar.classList.add("bg-gradient-to-br", "from-green-400", "to-green-600");
    avatar.textContent = "A";
  } else {
    avatar.classList.add("bg-gradient-to-br", "from-blue-500", "to-blue-700");
    avatar.textContent = "U";
  }

  const bubble = document.createElement("div");
  bubble.classList.add(
    "max-w-full",
    "md:max-w-2xl",
    "p-3",
    "rounded-lg",
    "whitespace-pre-wrap",
    "leading-relaxed",
    "shadow-sm"
  );

  if (sender === "assistant") {
    bubble.classList.add("bg-gray-200", "text-gray-900");
  } else {
    bubble.classList.add("bg-blue-600", "text-white");
  }

  bubble.textContent = content;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  return wrapper;
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getAssistantResponse(userMessage) {
  const mode = apiSelector.value;
  let url;

  if (mode === "chat") {
    url = `${BASE_URL}/chat`;
    const payload = { message: userMessage };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;

  } else {
    const thread_id = await getMetadata("thread_id");
    url = `${BASE_URL}/assistant`;
    const payload = { message: userMessage};
    if (thread_id) payload.thread_id = thread_id;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    
    if (mode == "assistant" && data.summary.thread_id) {
      const existingThreadId = await getMetadata("thread_id");
      if (!existingThreadId) {
        await saveMetadata("thread_id", data.summary.thread_id);
      }
    }



    return data; // Assuming the response contains a `news` array
  }
}

messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  chatContainer.appendChild(createMessageBubble(message, "user"));
  await saveMessage("user", message);

  userInput.value = "";
  scrollToBottom();

  try {
    const response = await getAssistantResponse(message);

    if (response.type === "chat") {
      response.results.forEach(news => {
        const newsElement = document.createElement("div");

        newsElement.innerHTML = `
          <div class="p-4 bg-white shadow rounded-lg border border-gray-200 m-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">${news.title}</h3>
            <p class="text-gray-700 mb-4">${news.description}</p>
            <a href="${news.link}" target="_blank" 
              class="text-blue-500 hover:text-blue-700 font-medium underline">
              Read more
            </a>
          </div>
        `;


        chatContainer.appendChild(newsElement);
      });

      chatContainer.appendChild(createMessageBubble(response.reply, "assistant"));

    } 
    else {
      // 일반 응답 처리
        response.results.forEach(news => {
          const newsElement = document.createElement("div");
  
          newsElement.innerHTML = `
            <div class="p-4 bg-white shadow rounded-lg border border-gray-200 m-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">${news.title}</h3>
              <p class="text-gray-700 mb-4">${news.description}</p>
              <a href="${news.link}" target="_blank" 
                class="text-blue-500 hover:text-blue-700 font-medium underline">
                Read more
              </a>
            </div>
          `;
  
  
          chatContainer.appendChild(newsElement);
        });
      
      

      chatContainer.appendChild(createMessageBubble(response.summary.reply, "assistant"));
    }

    //await saveMessage("assistant", JSON.stringify(response));
    scrollToBottom();
  } catch (error) {
    //console.error("Error fetching assistant response:", error);
    const errMsg = "Error fetching response. Check console.";
    chatContainer.appendChild(createMessageBubble(errMsg, "assistant"));
    //await saveMessage("assistant", errMsg);
    scrollToBottom();
  }
});

async function loadExistingMessages() {
  const allMsgs = await getAllMessages();
  for (const msg of allMsgs) {
    chatContainer.appendChild(createMessageBubble(msg.content, msg.role));
  }
  scrollToBottom();
}

newChatBtn.addEventListener("click", async () => {
  // Clear DB data and UI
  await clearAllData();
  chatContainer.innerHTML = "";
  // Now user can start a new chat fresh
});

initDB().then(loadExistingMessages);
