class ProgressBar {
  constructor(progressBarSelector, progressSelector) {
    this.$progressBarSelector = $(progressBarSelector);
    this.$progressSelector = $(progressSelector);
    this.valueMax = 0;
    this.percent = 1;
  }
  start(valueMax) {
    this.valueMax = valueMax;
    this.percent = 100 / this.valueMax;
    this.$progressBarSelector.removeClass("hidden");
    this.$progressSelector.attr("style", `width:${this.percent}%`);
    this.$progressSelector.attr("aria-valuenow", this.percent);
    this.$progressSelector.attr("aria-valuemax", this.valueMax);
  }
  update(value) {
    this.$progressSelector.attr("style", `width:${value * this.percent}%`);
    this.$progressSelector.attr("aria-valuenow", value * this.percent);
    this.$progressSelector.text(parseInt(value * this.percent) + "%");
  }
  stop() {
    this.$progressBarSelector.addClass("hidden");
    this.$progressSelector.attr("style", "width:100%");
    this.$progressSelector.attr("aria-valuenow", "100");
  }
}
