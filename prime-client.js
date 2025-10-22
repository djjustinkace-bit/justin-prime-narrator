const log = document.getElementById("log");

export async function postReflection(taskText) {
  const res = await fetch("/prime/reflection", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: taskText })
  });
  const data = await res.json();
  renderReflection(data);
}

function renderReflection(data) {
  const entry = document.createElement("div");
  entry.className = "entry";
  entry.innerHTML = `\n    <p>${data.reflection}</p>\n    <small style="opacity:0.6">\n      Alignment: ${Math.round(data.alignment * 100)}% • ${data.semantic_frame}\n    </small>`;
  log.prepend(entry);
}

// Example trigger: listen for new ChatGPT message
window.addEventListener("message", (event) => {
  if (event.data.type === "chatgpt:newMessage") {
    postReflection(event.data.text);
  }
});
