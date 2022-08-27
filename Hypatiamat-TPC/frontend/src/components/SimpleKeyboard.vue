<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String,
    },
  },
  data: () => ({
    keyboard: null,
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: {
        default: [
          ". , 0 1 2 3 4 5 6 7 8 9 {bksp}",
          "; ( ) { } [ ] -&infin; +&infin; x y + &times;",
          "<sup>-</sup> <sup>0</sup> <sup>1</sup> <sup>2</sup> <sup>3</sup> <sup>4</sup> <sup>5</sup> <sup>6</sup> <sup>7</sup> <sup>8</sup> <sup>9</sup> a b / - =",
        ],
      },
      display: {
        "{bksp}": "Apagar",
      },
      buttonTheme: [
        {
          class: "hg-green",
          buttons:
            ". , 0 1 2 3 4 5 6 7 8 9 ; ( ) { } [ ] -&infin; +&infin; x y a b",
        },
        {
          class: "hg-yellow",
          buttons:
            "<sup>-</sup> <sup>0</sup> <sup>1</sup> <sup>2</sup> <sup>3</sup> <sup>4</sup> <sup>5</sup> <sup>6</sup> <sup>7</sup> <sup>8</sup> <sup>9</sup>",
        },
        {
          class: "hg-red",
          buttons: "{bksp}",
        },
        {
          class: "hg-blue",
          buttons: "+ &times; / - =",
        },
      ],
    });
    this.keyboard.setInput(this.input);
  },
  methods: {
    onChange(input) {
      input = input.replace(/&times;/gi, "x");
      this.$emit("onChange", input);
      this.keyboard.setInput(input);
    },
    onKeyPress(button) {
      if (button === "{bksp}" && this.input) {
        let parsed = this.input.match(/(&#*\w*\d*;)$|(<sup>.<\/sup>)$/gi);
        if (parsed) {
          let last = this.input.lastIndexOf(parsed[0]);
          let newText = this.input.substring(0, last + 1);
          this.onChange(newText);
        }
      }
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
};
</script>

<style>
.simple-keyboard.hg-theme-default.myTheme {
  border: 2px solid #009263;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: auto;
}

.simple-keyboard.hg-layout-default .hg-button.hg-green {
  background: #4caf50;
  color: black;
}

.simple-keyboard.hg-layout-default .hg-button.hg-yellow {
  background: #dada54;
  color: black;
}

.simple-keyboard.hg-layout-default .hg-button.hg-red {
  background: #e2291f;
  color: black;
}

.simple-keyboard.hg-layout-default .hg-button.hg-blue {
  background: #3f73a2;
  color: black;
}
</style>
