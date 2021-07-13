(this.webpackJsonpphonebook = this.webpackJsonpphonebook || []).push([
  [0],
  {
    44: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(18),
        c = n.n(r),
        a = n(19),
        o = n(4),
        u = n(2),
        i = n(0),
        s = function (e) {
          var t = e.handleSubmit,
            n = Object(u.useState)(""),
            r = Object(o.a)(n, 2),
            c = r[0],
            a = r[1],
            s = Object(u.useState)(""),
            d = Object(o.a)(s, 2),
            f = d[0],
            l = d[1];
          return Object(i.jsxs)("form", {
            onSubmit: function (e) {
              e.preventDefault(), t({ name: c, number: f }), a(""), l("");
            },
            children: [
              Object(i.jsxs)("div", {
                children: [
                  "name:",
                  " ",
                  Object(i.jsx)("input", {
                    value: c,
                    onChange: function (e) {
                      return a(e.target.value);
                    },
                  }),
                ],
              }),
              Object(i.jsxs)("div", {
                children: [
                  "number:",
                  Object(i.jsx)("input", {
                    value: f,
                    onChange: function (e) {
                      return l(e.target.value);
                    },
                  }),
                ],
              }),
              Object(i.jsx)("div", {
                children: Object(i.jsx)("button", {
                  type: "submit",
                  children: "add",
                }),
              }),
            ],
          });
        },
        d = function (e) {
          var t = e.persons,
            n = e.handleRemove;
          return t.map(function (e) {
            return Object(i.jsxs)(
              "div",
              {
                children: [
                  Object(i.jsxs)("p", {
                    children: [
                      Object(i.jsx)("b", { children: "Name: " }),
                      e.name,
                      "  ",
                      Object(i.jsx)("b", { children: "Phone: " }),
                      e.number,
                    ],
                  }),
                  Object(i.jsx)("button", {
                    onClick: function () {
                      return n(e);
                    },
                    children: "Remove",
                  }),
                ],
              },
              e.name
            );
          });
        },
        f = function (e) {
          var t = e.filter,
            n = e.handleFilter;
          return Object(i.jsxs)("p", {
            children: [
              "Filter shown with",
              Object(i.jsx)("input", {
                value: t,
                onChange: function (e) {
                  n(e.target.value);
                },
              }),
            ],
          });
        },
        l = n(3),
        b = n.n(l),
        j = n(6),
        h = n(7),
        p = n.n(h),
        m = "/api/persons",
        v = {
          getAll: (function () {
            var e = Object(j.a)(
              b.a.mark(function e() {
                var t;
                return b.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (t = p.a.get(m)),
                          e.abrupt(
                            "return",
                            t.then(function (e) {
                              return e.data;
                            })
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          addPerson: (function () {
            var e = Object(j.a)(
              b.a.mark(function e(t) {
                var n;
                return b.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = p.a.post(m, t)),
                          e.abrupt(
                            "return",
                            n.then(function (e) {
                              return e.data;
                            })
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          removePerson: (function () {
            var e = Object(j.a)(
              b.a.mark(function e(t) {
                var n;
                return b.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = p.a.delete("".concat(m, "/").concat(t))),
                          e.abrupt(
                            "return",
                            n.then(function (e) {
                              return e.data;
                            })
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          updatePerson: (function () {
            var e = Object(j.a)(
              b.a.mark(function e(t, n) {
                var r;
                return b.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = p.a.put("".concat(m, "/").concat(t), n)),
                          e.abrupt(
                            "return",
                            r.then(function (e) {
                              return e.data;
                            })
                          )
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n) {
              return e.apply(this, arguments);
            };
          })(),
        },
        x = function (e) {
          var t = e.flag,
            n = e.text,
            r = {
              color: "error" === t ? "red" : "green",
              background: "lightgrey",
              fontSize: "20px",
              borderStyle: "solid",
              borderRadius: "5px",
              padding: "10px",
              textAlign: "center",
            };
          return (
            console.log({ flag: t, text: n }),
            Object(i.jsxs)("div", {
              style: r,
              children: [
                Object(i.jsx)("br", {}),
                Object(i.jsx)("em", { children: n }),
              ],
            })
          );
        },
        O = function () {
          var e = Object(u.useState)([]),
            t = Object(o.a)(e, 2),
            n = t[0],
            r = t[1];
          Object(u.useEffect)(function () {
            v.getAll().then(function (e) {
              r(e);
            });
          }, []);
          var c = Object(u.useState)(""),
            l = Object(o.a)(c, 2),
            b = l[0],
            j = l[1],
            h = Object(u.useState)({}),
            p = Object(o.a)(h, 2),
            m = p[0],
            O = p[1],
            g = n.filter(function (e) {
              return e.name.toLowerCase().includes(b.toLowerCase().trim());
            });
          return Object(i.jsxs)("div", {
            children: [
              Object(i.jsx)("h2", { children: "Phonebook" }),
              Object(i.jsx)(x, { flag: m.flag, text: m.text }),
              Object(i.jsx)(f, { filter: b, handleFilter: j }),
              Object(i.jsx)(s, {
                handleSubmit: function (e) {
                  var t = e.name,
                    c = n.find(function (e) {
                      return e.name === t;
                    });
                  void 0 !== c
                    ? window.confirm(
                        "".concat(
                          t,
                          " is already added to phonebook, update a new number?"
                        )
                      ) &&
                      v
                        .updatePerson(c.id, e)
                        .then(function (e) {
                          r(
                            n.map(function (t) {
                              return t.name !== e.name ? t : e;
                            })
                          ),
                            O({
                              flag: "success",
                              text: "Modified ".concat(e.name, "'s info"),
                            });
                        })
                        .catch(function (e) {
                          O({
                            flag: "error",
                            text: "Error: ".concat(e.response.data.error),
                          });
                        })
                    : v
                        .addPerson(e)
                        .then(function (e) {
                          r([].concat(Object(a.a)(n), [e])),
                            O({
                              flag: "success",
                              text: "Added ".concat(e.name),
                            });
                        })
                        .catch(function (e) {
                          O({
                            flag: "error",
                            text: "Error: ".concat(e.response.data.error),
                          });
                        });
                },
              }),
              Object(i.jsx)("h2", { children: "Numbers" }),
              Object(i.jsx)(d, {
                persons: g,
                handleRemove: function (e) {
                  var t = n.find(function (t) {
                    return t === e;
                  }).id;
                  window.confirm("Delete ".concat(e.name, " ?")) &&
                    v
                      .removePerson(t)
                      .then(function () {
                        return v.getAll().then(function (t) {
                          r(t),
                            O({
                              flag: "success",
                              text: "Removed ".concat(e.name),
                            });
                        });
                      })
                      .catch(function (t) {
                        console.log(t),
                          O({
                            flag: "error",
                            text: "Information of ".concat(
                              e.name,
                              " has been removed from server"
                            ),
                          });
                      });
                },
              }),
            ],
          });
        };
      c.a.render(Object(i.jsx)(O, {}), document.getElementById("root"));
    },
  },
  [[44, 1, 2]],
]);
//# sourceMappingURL=main.292cbd16.chunk.js.map
