const pages = [
  {
    text: "Austin",
    href: "./austin/index.html"
  },
  {
    text: "Hannah",
    href: "./hannah/"
  },
  {
    text: "Jake",
    href: "./jake/"
  },
  {
    text: "Secret Hitler",
    href: "./secret-hitler/"
  }
]

const ul = document.querySelector("ul");

const getLI = (text, href) => {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;

  const li = document.createElement("li");
  li.appendChild(a);

  return li;
};

for(const page of pages) {
  const li = getLI(page.text, page.href);
  ul.appendChild(li);
}
