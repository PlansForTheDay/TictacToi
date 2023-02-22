function Draw_Cell(gameCell){
    if (gameCell.firstChild < 1 && document.getElementById("victoryNotice") == null){
        var picture = document.createElement("div");
        var symbol = "cross";
        picture.className = symbol;
        gameCell.appendChild(picture);

        var result = WinCheck(symbol);

        if (result.symbol && !result.opponent){
            Conclusions(result);
        }
        else if(!result.symbol && !result.opponent){
            for (var round = 0; round < 9; round++){
                if (document.getElementById(round + 1).firstChild < 1 && document.getElementById("victoryNotice") == null){
                    console.log("Имеется пустая ячейка и нет табло")
                    OpponentMoves(symbol);
                    break;
                }

                if(round == 8){
                    console.log("Пустых ячеек не имеется")
                    Conclusions(result);
                }
            }
        }
    }
    console.log("~~~ ~~~ Действие окончено ~~~ ~~~")
}

function OpponentMoves(symbol){
    var playerSymbol = symbol;
    var opponentSymbol;
    switch(symbol){
        case "cross": opponentSymbol="circle"; break;
        case "circle": opponentSymbol="cross"; break;
    }


    while(true){
    //for (var round = 0; round < 90; round++){
        var num = getRandomInt(9);
        console.log("Бот выбрал ячейку: " + num)
        if (document.getElementById(num).firstChild < 1 && document.getElementById("victoryNotice") == null){
            var picture = document.createElement("div");
            picture.className = opponentSymbol;
            document.getElementById(num).appendChild(picture);

            console.log("Бот сходил")
            break;
        }
        console.log(" => Ячейка занята")
    }

    if (WinCheck(symbol).opponent){
        Conclusions(WinCheck(symbol));
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }
function Conclusions(result){
    if (result.symbol == true && result.opponent == false){
        ResultOutput("Вы победили,\n обновите страницу и сыграйте ещё раз");
        console.log("Игрок победил")
    }
    else if (result.symbol == false && result.opponent == true){
        ResultOutput("Вы проиграли,\n обновите страницу и попробуйте ещё раз");
        console.log("Бот победил")
    }
    else{
        ResultOutput("Ничья,\n обновите страницу и попробуйте ещё раз");
        console.log("Ничья")
    }
    console.log("Оглашён результат")
}
function ResultOutput(message){
    var wonMess = document.createElement("div");
    wonMess.className = "victory-notice";
    wonMess.id = "victoryNotice";
    wonMess.innerText = message;

    document.getElementById("block").appendChild(wonMess);
}

function IdConverter(id){
    var i = 0, j = 0;
    switch(id){
        case 1: i=0, j=0; break;
        case 2: i=0, j=1; break;
        case 3: i=0, j=2; break;
        case 4: i=1, j=0; break;
        case 5: i=1, j=1; break;
        case 6: i=1, j=2; break;
        case 7: i=2, j=0; break;
        case 8: i=2, j=1; break;
        case 9: i=2, j=2; break;
    }
    return {i : i, j : j};
}

function WinCheck(symbol){
    var playerSymbol = symbol;
    var opponentSymbol;
    switch(symbol){
        case "cross": opponentSymbol="circle"; break;
        case "circle": opponentSymbol="cross"; break;
    }

    var map = [ 
        ["null","null","null"],
        ["null","null","null"],
        ["null","null","null"]
    ]

    for(var i = 1; i < 10; i++){
        var element = document.getElementById(i).firstChild;
        var ind = IdConverter(i);

        if (element != null){
            switch (element.className){
                case playerSymbol: map[ind.i][ind.j] = playerSymbol; break;
                case opponentSymbol: map[ind.i][ind.j] = opponentSymbol; break;
            }
        }
    }

    var playerWin = CheckingSequenceOfThree(map, playerSymbol);
    var botWin = CheckingSequenceOfThree(map, opponentSymbol);

    console.log("Проверка на 3 в ряд завершена");
    console.log("Победа игрока = " + playerWin);
    console.log("Победа соперника = " + botWin);
    
    return {symbol : playerWin, opponent : botWin};
}

function CheckingSequenceOfThree(map, symbol){

    var diagonal = CheckDiagonal(map, symbol);
    var line = CheckLines(map, symbol);

    return (diagonal || line);
}

function CheckDiagonal(map, symbol){
    var toright = true, toleft = true;

	for (var i=0; i<3; i++) {
		toright &= (map[i][i] == symbol);
		toleft &= (map[3-i-1][i] == symbol);
	}
		
	if (toright || toleft) return true;
	return false; 
}
function CheckLines(map, symbol){
    var cols, rows;

	for (var i=0; i<3; i++) {
		cols = true;
		rows = true;

		for (var j=0; j<3; j++) {
			cols &= (map[i][j] == symbol);
			rows &= (map[j][i] == symbol);
		}

		if (cols || rows) return true; 
	}
	return false; 
}