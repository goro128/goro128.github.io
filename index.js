let correct = new Set()

$(function () {
    $(".tray > img").draggable({
        snap: ".square-wrapper",
        snapMode: "inner"
    })
    $("#check").click(() => {
        correct = new Set()
        $(".tray > img").each(function () {
            const name = $(this).attr("name")
            const pos = this.getBoundingClientRect()
            $(".square").each(function () {
                const squareName = $(this).attr("name")
                if (squareName.includes(name) && overlaps(this.getBoundingClientRect(), pos)) {
                    correct.add(name)
                }
            })
        })
        $("#success").html(correct.size + "/9")
        if (correct.size == 9) {
            $("#success").css("color", "green")
            $(".shirt").css("background-image", "url(\"./images/kroj&stvari.png\")")
            $(".tray > img").attr("style", "position:relative;")
            $(".square").css("visibility", "hidden")
            $(".success").css("visibility", "visible")
        }
        $(".tray > img").filter(function (i, el) {
            return !correct.has($(el).attr("name"))
        }).attr("style", "position:relative;")
    })
})

function overlaps(pos1, pos2) {
    return pos1.x >= pos2.x && pos1.x <= pos2.x + pos2.width && pos1.y >= pos2.y & pos1.y <= pos2.y + pos2.height
}
