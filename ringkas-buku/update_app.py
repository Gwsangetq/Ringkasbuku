import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

path = r"C:\Users\kumala\.gemini\antigravity\scratch\ringkas-buku\app.js"
with open(path, "r", encoding="utf-8") as f:
    c = f.read()

c_norm = c.replace('\r\n', '\n')

old_code = """  // Checklist Coba Minggu Ini
  const checklistBox = $("#checklistBox");
  if (checklistBox) {
    const actions = b.checklistActions || b.checklist || [];
    const ckKey = "rb_ck_" + currentUser.email + "_" + b.slug;
    const ck = store.get(ckKey, {});
    checklistBox.innerHTML = actions.map((c, i) => `
      <div class="checklist-item ${ck[i] ? 'checked' : ''}">
        <input type="checkbox" id="ck-${i}" ${ck[i] ? "checked" : ""} onchange="toggleCk(${i}, this.checked)">
        <label for="ck-${i}" style="cursor: pointer; flex: 1;">${c}</label>
      </div>
    `).join("");
  }

  window.toggleCk = (i, v) => {
    const ckKey = "rb_ck_" + currentUser.email + "_" + b.slug;
    const c2 = store.get(ckKey, {});
    c2[i] = v;
    store.set(ckKey, c2);
    renderReader();
  };"""

new_code = """  // Checklist Coba Minggu Ini
  const checklistBox = $("#checklistBox");
  if (checklistBox) {
    const userEmail = (currentUser && currentUser.email) ? currentUser.email : "guest";
    const actions = b.checklistActions || b.checklist || [];
    const ckKey = "rb_ck_" + userEmail + "_" + b.slug;
    const ck = store.get(ckKey, {});
    checklistBox.innerHTML = actions.map((c, i) => `
      <div class="checklist-item ${ck[i] ? 'checked' : ''}" id="ckItem-${i}">
        <input type="checkbox" id="ck-${i}" ${ck[i] ? "checked" : ""} onchange="toggleCk(${i}, this.checked)">
        <label for="ck-${i}" style="cursor: pointer; flex: 1;">${c}</label>
      </div>
    `).join("");
  }

  window.toggleCk = (i, v) => {
    const userEmail = (currentUser && currentUser.email) ? currentUser.email : "guest";
    const ckKey = "rb_ck_" + userEmail + "_" + b.slug;
    const c2 = store.get(ckKey, {});
    c2[i] = v;
    store.set(ckKey, c2);
    const item = document.getElementById("ckItem-" + i);
    if (item) {
      if (v) item.classList.add("checked");
      else item.classList.remove("checked");
    }
  };"""

if old_code in c_norm:
    c_norm = c_norm.replace(old_code, new_code)
    print("Replaced toggleCk in app.js successfully")
else:
    print("Warning: old toggleCk code block not found exactly")

with open(path, "w", encoding="utf-8") as f:
    f.write(c_norm)

print("app.js update done")
