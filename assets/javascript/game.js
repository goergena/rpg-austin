$(document).ready(function () {
    //set all ids to variables
    var twilightImg = $("#twilight");
    var celestiaImg = $("#celestia");
    var discordImg = $("#discord");
    var nightmareImg = $("#nightmare");

    var allPonies = {
        twilight: {
            health: 180,
            attack: 14,
            counter: 50,
            loserImg: "twilight-defeated.jpeg",
        },
        celestia: {
            health: 350,
            attack: 16,
            counter: 40,
            loserImg: "celestia-defeated.png"
        },
        discord: {
            health: 200,
            attack: 18,
            counter: 25,
            loserImg: "discord-defeated.png"
        },
        nightmare: {
            health: 250,
            attack: 16,
            counter: 10,
            loserImg: "nightmare-defeated.png"
        }
    };

    var hero = "";
    var challenger = "";
    var myChallenger = "";
    var currentAttack = 0;
    var wins = 0;
    var restartBtn = $("<button>Restart</button>");
    var attackBtn = $("<button>ATTACK!</button>");
    attackBtn.addClass("btn btn-dark");

//when user clicks a pony, that one is selected as the hero & calls the heroIsHere function
    $(".pony").on("click", function () {
        if (!hero) {
            hero = allPonies[$(this).val()];
            heroIsHere();
            $("#hero-body").append(this);
            $("#hero-health").append(hero.health);
            //the hero loses the pony class-- losing the click function and the hover
            $(this).attr("class", "hero-class");
        }
    });
//when a pony is clicked within the enemy box, it is chosen as the challenger.
    $("#enemy-box").on("click", ".pony", function chooseChallenger() {
        if (!myChallenger) {
            $("#message-box, #attack-nar").empty();
            myChallenger = this;
            console.log(myChallenger);
            challenger = allPonies[$(this).val()];
            //challengers lose the pony class--losing the click function and the hover
            $(this).removeClass("pony");
            $("#challenger-body").append(this);
            $("#challenger-health").append(challenger.health);
            $("#attack-button").append(attackBtn);
        }
    });
//the enemy box, hero box, and challenger boxes are made visible. The enemies are moved to the enemy box.
    function heroIsHere() {
        $("#enemy-box").removeClass("hidden");
        $("#enemy-body").append(twilightImg, celestiaImg, discordImg, nightmareImg);
        $("#hero-box").removeClass("hidden");
        $("#challenger-box").removeClass("hidden");
    };

    $("#attack-button").on("click", function () {
        heroAttack();
        counterAttack();
        if (wins === 3) {
            youWon();
        }
    });

    function heroAttack() {
        currentAttack += hero.attack;
        challenger.health -= currentAttack;
        $("#attack-nar").text("You attacked for " + currentAttack + " damage!")
        $("#challenger-health").text(challenger.health);
        if (challenger.health <= 0 && hero.health > 0) {
            challengerDied();
        };
    }

    function counterAttack() {
        if (challenger.health > 0) {
            hero.health -= challenger.counter;
            //if hero dies, the attack button disappears, restart button appears, hero image changes
            if (hero.health <= 0) {
                $("#message-box").append("You lost!");
                $(".hero-class").html("<img src='assets/images/" + hero.loserImg + "' class='img-fluid'>");
                makeRestartBtn();
                $("#attack-button").empty();
            };
            $("#attack-nar").append("<div>Your opponent attacked and you took " + challenger.counter + " damage!</div>");
            $("#hero-health").text(hero.health);
        }
    };

    //when a challenger is defeated, their image changes, they return to the enemy box (but user can't battle them again)
    //challenger and myChallenger are cleared so that user can select a new challenger.
    function challengerDied() {
        wins++;
        $(myChallenger).html("<img src='assets/images/" + challenger.loserImg + "' class='img-fluid'>");
        $(myChallenger).addClass("defeated");
        $("#enemy-body").append(myChallenger);
        $("#challenger-body, #challenger-health, #attack-button").empty();
        $("#message-box").append("You defeated your opponent! Choose another challenger");
        challenger = "";
        myChallenger = "";
    }

    function youWon() {
        $("#attack-nar").empty();
        $("#message-box").text("You have defeated all 3 enemies! You win!");
        makeRestartBtn();
    };

    $("#restart").on("click", function () {
        document.location.reload(true);
    });

    function makeRestartBtn() {
        restartBtn.addClass("btn btn-success");
        $("#restart").append(restartBtn);
    }

}); //closes document.ready