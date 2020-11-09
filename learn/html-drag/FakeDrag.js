(() => {
  const state = {
    mousedownEventObj: void 0,
    draging: false,
    dragend: () => {},
    mousemove: () => {},
    meta: { data: {} },
  };
  const mutation = {
    cacheMousedown: (e) => {
      state.mousedownEventObj = e;
    },
    clearMousedown: () => {
      state.mousedownEventObj = void 0;
    },
    dragstart: (dragend, mousemove) => {
      state.draging = true;
      state.dragend = dragend || state.dragend;
      state.mousemove = mousemove || state.mousemove;
    },
    dragend: () => {
      mutation.clearMousedown();
      state.draging = false;
      state.dragend = () => {};
      state.mousemove = () => {};
    },
    setmeta: (data) => {
      state.meta.data = data;
    },
  };

  function isLeftClick(evt) {
    return evt.button === 0;
  }
  function destroy(el) {
    const ctx = el.__fakedrag;
    if (ctx !== void 0) {
      if (ctx.handle.el) {
        ctx.handle.el.removeEventListener("mousedown", ctx.handler.mousedown);
        ctx.handle.el.removeEventListener("mouseup", ctx.handler.mouseup);
        ctx.handle.el.removeEventListener("mouseenter", ctx.handler.mouseenter);
        ctx.handle.el.removeEventListener("mouseleave", ctx.handler.mouseleave);
      }
    }
  }
  function run(fn) {
    if (fn === void 0) return () => {};
    else
      return (e) => {
        fn({ e, meta: state.meta, set: mutation.setmeta });
      };
  }
  document.addEventListener("mousemove", (e) => {
    if (!state.draging) return;
    state.mousemove(e);
  });
  document.addEventListener("mouseup", (e) => {
    mutation.clearMousedown();
    if (!state.draging) return;
    state.dragend(e);
    mutation.dragend();
  });
  document.addEventListener("drag", (e) => {
    e.preventDefault();
    mutation.clearMousedown();
    if (!state.draging) return;
    state.dragend(e);
    mutation.dragend();
  });
  window.FakeDrag = {
    name: "fake-drag",
    bind: (el, { value }) => {
      el.style.userSelect = "none";
      const {
        dragstart,
        dragover,
        dragend,
        dragenter,
        dragleave,
        mousemove,
        sensitivity,
        handle,
      } = value || {};
      const ctx = {
        handle: {
          selector: handle,
          el: handle ? el.querySelector(handle) : el,
        },
        sensitivity,
        fn: {
          dragstart: run(dragstart),
          dragover: run(dragover),
          dragend: run(dragend),
          dragenter: run(dragenter),
          dragleave: run(dragleave),
          mousemove: run(mousemove),
        },
        handler: {
          mousedown: (e) => {
            if (!isLeftClick(e)) mutation.clearMousedown();
            else mutation.cacheMousedown(e);
          },
          mousemove: (e) => {
            if (state.draging === false && state.mousedownEventObj !== void 0) {
              let sx = 10,
                sy = 10;
              const s = state.mousedownEventObj;
              const x = Math.abs(e.clientX - s.clientX);
              const y = Math.abs(e.clientY - s.clientY);
              if (ctx.sensitivity !== void 0) {
                if (typeof ctx.sensitivity === "object") {
                  sx = ctx.sensitivity.x || sx;
                  sy = ctx.sensitivity.y || sy;
                }
                if (typeof ctx.sensitivity === "number") {
                  sx = ctx.sensitivity;
                  sy = ctx.sensitivity;
                }
              }
              if (x < sx && y < sy) return;
              ctx.fn.dragstart(state.mousedownEventObj);
              mutation.dragstart(ctx.fn.dragend, ctx.fn.mousemove);
            }
            if (!state.draging) return;
            ctx.fn.dragover(e);
          },
          mouseenter: (e) => {
            if (!state.draging) return;
            ctx.fn.dragenter(e);
          },
          mouseleave: (e) => {
            if (!state.draging) return;
            ctx.fn.dragleave(e);
          },
        },
      };
      el.__fakedrag = ctx;
      if (ctx.handle.el) {
        ctx.handle.el.addEventListener("mousedown", ctx.handler.mousedown);
        ctx.handle.el.addEventListener("mousemove", ctx.handler.mousemove);
        ctx.handle.el.addEventListener("mouseenter", ctx.handler.mouseenter);
        ctx.handle.el.addEventListener("mouseleave", ctx.handler.mouseleave);
      }
    },
    unbind: (el) => {
      destroy(el);
    },
  };
})();
