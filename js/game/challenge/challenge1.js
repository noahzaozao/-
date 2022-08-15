function GainTimeChallenge1Points(){
    return n(player.time_challenge1_buy_1.add(player.time_challenge1_buy_1_distorted)).mul(timeChallenge1BuyEff(1))
}

function GainTimeChallenge1Dim1(){
    return n(player.time_challenge1_buy_2.add(player.time_challenge1_buy_2_distorted)).mul(timeChallenge1BuyEff(2))
}

function GainTimeChallenge1Dim2(){
    return n(player.time_challenge1_buy_3.add(player.time_challenge1_buy_3_distorted)).mul(timeChallenge1BuyEff(3))
}

function GainTimeChallenge1Dim3(){
    return n(player.time_challenge1_buy_4.add(player.time_challenge1_buy_4_distorted)).mul(timeChallenge1BuyEff(4))
}

function GainTimeChallenge1Dim4(){
    let base = n(player.time_challenge1_buy_4.add(player.time_challenge1_buy_4_distorted)).mul(timeChallenge1BuyEff(4))
    if(base.gt(0)){base = base.log(10)}
    return base
}

function timeChallenge1Eff(){
    return player.time_challenge1_points.max(1).log(1.85).max(1).pow(0.2).max(1)
}

function timeChallenge1BuyCost(id){
	if(id==1){
		let cost = player.time_challenge1_buy_1.pow(1.25).pow(player.time_challenge1_buy_1.add(1).div(5))
		return cost
	}else if(id==2){
        let cost = player.time_challenge1_buy_2.add(1).pow(1.45).pow(player.time_challenge1_buy_2.add(1).div(3)).mul(1e13)
		return cost
    }else if(id==3){
        let cost = player.time_challenge1_buy_3.add(1).pow(1.8).pow(player.time_challenge1_buy_3.add(1).div(1.5)).mul(1e36)
		return cost
    }else if(id==4){
        let cost = n(1e32).pow(player.time_challenge1_buy_4.add(1)).pow(2.5)
		return cost
    }
}

function timeChallenge1BuyEff(id){
	if(id==1){
		let eff = n(2).pow(player.time_challenge1_buy_1).mul(timeChallenge1BuyEff(4))
		return eff
	}else if(id==2){
        let eff = n(2).pow(player.time_challenge1_buy_2).mul(timeChallenge1BuyEff(4))
		return eff
    }else if(id==3){
        let eff = n(2).pow(player.time_challenge1_buy_3).mul(timeChallenge1BuyEff(4))
		return eff
    }else if(id==4){
        let eff = n(100).pow(player.time_challenge1_buy_4)
		return eff
    }
}

function timeChallenge1BuyNextEff(id){
	if(id==1){
		let eff = n(2).pow(player.time_challenge1_buy_1.add(1))
		return eff
	}else if(id==2){
        let eff = n(2).pow(player.time_challenge1_buy_2.add(1))
		return eff
    }else if(id==3){
        let eff = n(2).pow(player.time_challenge1_buy_3.add(1))
		return eff
    }else if(id==4){
        let eff = n(100).pow(player.time_challenge1_buy_4.add(1))
		return eff
    }
}

function buyTimeChallenge1(id){
	let cost = n(timeChallenge1BuyCost(id))
	if(player.time_challenge1_points.gte(cost)){
		player['time_challenge1_buy_'+id] = player['time_challenge1_buy_'+id].add(1)
		player.time_challenge1_points = player.time_challenge1_points.sub(cost)
        if(id==4){
            player.time_challenge1_buy_1 = n(0)
            player.time_challenge1_buy_2 = n(0)
            player.time_challenge1_buy_3 = n(0)
            player.time_challenge1_points = n(0)
            player.time_challenge1_buy_1_distorted = n(0)
            player.time_challenge1_buy_2_distorted = n(0)
            player.time_challenge1_buy_3_distorted = n(0)
        }
	}
}

function timeChallenge1Css(id){
	let cost = n(timeChallenge1BuyCost(id))
	if(player.time_challenge1_points.gte(cost)){
		getCss('time_challenge1_buy_'+id,'time_challenge1_buy_can')
	}else{
		lossCss('time_challenge1_buy_'+id,'time_challenge1_buy_can')
	}
}