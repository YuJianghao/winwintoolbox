window.SlideTransitionGroup = {
  name: "SlideTransitionGroup",
  props: {
    tag: String,
    duration: {
      type: Number,
      default: 200,
    },
    name: String,
  },
  render(h) {
    return h(
      "transition-group",
      {
        props: {
          tag: this.tag,
          css: false,
          name: this.name,
        },
        on: {
          enter: (el, done) => {
            el.style.opacity = 0;
            el.style.height = 0;
            el.style.transition = `all ease-in-out ${this.duration}ms`;
            el.style.overflowY = "hidden";
            setTimeout(
              () => {
                el.style.opacity = 1;
                el.style.height = el.scrollHeight + "px";
                setTimeout(() => {
                  el.style.opacity = null;
                  el.style.height = null;
                  el.style.transition = null;
                  el.style.overflowY = null;
                  done();
                }, this.duration);
              },
              this.duration ? 100 : 0
            );
          },
          leave: (el, done) => {
            el.style.opacity = 1;
            el.style.height = el.scrollHeight + "px";
            el.style.transition = `all ease-in-out ${this.duration}ms`;
            el.style.overflowY = "hidden";
            setTimeout(
              () => {
                el.style.opacity = 0;
                el.style.height = 0;
                setTimeout(() => {
                  el.style.opacity = null;
                  el.style.height = null;
                  el.style.transition = null;
                  el.style.overflowY = null;
                  done();
                }, this.duration);
              },
              this.duration ? 100 : 0
            );
          },
        },
      },
      this.$scopedSlots.default ? this.$scopedSlots.default() : void 0
    );
  },
};
