CourseWare.CourseExercises.CourseExercisesControlsView = Backbone.Speexx.HandlebarsView.extend({
    templateName: "cw-language-course-controls",
    className: "exercise-controls",
    initialize: function (e) {
        var t = this.exerciseView = e.exerciseView,
            n = t.model;
        this.firstTime = !0, this.solutionShown = !1, this.modified = !1, this.dialogEnded = !1, this.listenTo(t, "modified", function () {
            this.modified || (this.modified = !0, this.render())
        }), this.listenToOnce(t, "dialog:ended", function () {
            this.dialogEnded = !0, this.render()
        }), this.listenTo(t, "static:added static:removed", this.render), this.listenTo(n, "sync", function (e, t, n) {
            var r = !!this.silent;
            this.silent = !!n.silent, (!this.silent || !r) && this.render()
        }), this.listenTo(CourseWare.Language, "change:textpool", this.render), this.on("render:after", function () {
            this.$(".btn.btn-link[title]").tooltip()
        })
        window.entryp = this;
        console.log(this)
    },
    templateModel: function () {
        var e = this.exerciseView,
            t = e.model,
            n = this.silent ? null : t.get("result"),
            r = t.get("type").pronunciation,
            i = !e.static && t.get("type").hasResult && !r,
            s = e.static || !t.get("type").hasResult,
            o = !this.solutionShown && i && !this.firstTime && n !== 100;
        return {
            firstTime: this.firstTime,
            hasCorrect: i,
            hasSolution: o,
            hideResult: s,
            dialogEnded: this.dialogEnded,
            modified: this.modified,
            solutionShown: this.solutionShown,
            result: n
        }
    },
    events: {
        "click .btn.correct": function () {
            console.log("hello again");
            CourseWare.Audio.stop();
            // this.firstTime = !1;
            this.trigger("correct");
            // this.render(), this.trigger("solve");
        },
        "click .btn.repeat": function () {
            this.exerciseView.model.get("staticBefore") ? this.exerciseView.setStatic() : this.exerciseView.render()
        },
        "click .btn.next": function () {
            this.trigger("next")
        },
        "keypress .btn.next": function (e) {
            e.preventDefault(), (e.originalEvent.charCode === 13 || e.originalEvent.charCode === 32) && this.trigger("nextKeyboard")
        },
        "click .btn.solution": function () {
            // this.solutionShown = !0;
            this.render(), this.trigger("solve")
        }
    }
});
setInterval(function () {
    window.entryp.trigger("solve");
    setTimeout(() => {
        window.entryp.trigger("correct");
    }, 10000);
    setTimeout(() => {
        $(".next").click();
    }, 15000);
}, 20000);
