const pin_array = [4, 5, 12, 13, 14, 16],
  pin_detail = ["LED 1", "LED 2", "LED 3", "LED 4", "LED 5", "LED 6"];
let pin_array_state = [0, 0, 0, 0, 0, 0, 0, 0];
function toggleLED(e) {
  let t = e.ID,
    a = e.children[1].classList,
    n = 0 == pin_array_state[e.state] ? 1 : 0;
  a.add("s"),
    fetch("/toggle?led=" + t + "&&state=" + n)
      .then((t) => {
        if (1 == t.error) throw new Error("Network response was not ok");
        a.remove("s"), a.toggle("a"), (pin_array_state[e.state] = n);
      })
      .catch((e) => {});
}
window.onload = () => {
  fetch("/states")
    .then((e) => {
      if (!e.ok) throw new Error("Network response was not ok");
      return e.json();
    })
    .then((e) => {
      let t = (e) => document.createElement(e);
      try {
        pin_array_state = e.state;
      } catch (e) {}
      pin_array.forEach((e, a) => {
        let n = t("li"),
          o = t("span"),
          s = t("div"),
          r = t("div");
        (o.innerText = pin_detail[a] || "NULL"),
          (s.className = 1 == pin_array_state[a] ? "so a" : "so"),
          (r.className = "si"),
          (n.ID = e),
          (n.state = a),
          (n.onclick = () => toggleLED(n)),
          n.append(o),
          n.append(s),
          s.append(r),
          document.querySelector("ol").append(n);
      });
    })
    .catch((e) => {});
  let e = (e) => document.createElement(e),
    t = e("div"),
    a = e("div"),
    n = e("div"),
    o = e("div"),
    s = e("button"),
    r = e("button");
  (t.className = "pop-out dfx"),
    (a.className = "pop-in dfx f"),
    (n.className = "pop-detail"),
    (o.className = "dfx"),
    (o.style.width = "100%"),
    (s.innerText = "Close"),
    (r.innerText = "Continue"),
    o.append(s),
    o.append(r),
    t.append(a),
    a.append(n),
    a.append(o),
    document.body.append(t);
};
