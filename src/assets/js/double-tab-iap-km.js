$(function() {
    const id = ["all","gem", "season", "piggy", "welcome", "package"]

    for (let i = 0; i < id.length; i++){
        $("#"+id[i]).click(function() {
            fakedrawByID(this.id)
            if(isCurrentTab(this.id) == false){
                redrawByID(this.id)
                setTimeout(() => {$("#"+this.id).click()}, 200)
            }
        });
    }
});

