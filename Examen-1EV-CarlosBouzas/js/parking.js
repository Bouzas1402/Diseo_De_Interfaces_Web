class Parking{
	constructor( numPlazas ){
		this.plazas = [];
		for (var i = 0; i<numPlazas; i++) {
			this.plazas[i] = false;
		}
		this.cajero = 0;
		this.precioHora = 0.09;

		this.history = [];
	}

	aparcar(date, plaza){

		var matricula = prompt("introduce la matricula del vehiculo\n0000-XXX ó XX-0000-XX");
		console.log(matricula);
		if(matricula === null || matricula == ''){
			app.mostrarMensaje("No se ha introducido ninguna matricula");
			return;
		}
		if(!this.validarMatricula(matricula)){
			app.mostrarMensaje("La matricula no es válida");
			return;	
		}

		console.log(plaza);
		if(plaza === 'undefined'){
			plaza = this.getPlazaLibre();
		}
		
		if (plaza !== false) {
			this.ocuparPlaza(plaza, matricula, date);
		}else{
			app.mostrarMensaje("No hay plazas disponibles");
		}
	}

	desAparcar(date, matricula){

		var dateTmp = new Date(date);
		if(matricula == undefined){
			matricula = prompt("introduce la matricula del vehiculo");
		}
		
		var plaza = this.getPlazaOcupada(matricula);
		if (plaza !== false) {
			var tiempo = this.getTiempoOcupacionParking(plaza, dateTmp);
			var price = this.calcularPrecio(tiempo);
			app.mostrarMensaje("Su tiempo de estacionamiento es de "+ (tiempo.days)+" dias - "+(tiempo.hours)+":"+tiempo.minutes);
			this.history.push({
				'plaza':plaza, 
				'matricula':matricula,
				'start':this.plazas[plaza].time, 
				'finish':dateTmp, 
				'time': tiempo,
				'price': price
			});
			this.cajero += price;
			this.plazas[plaza] = false;
		}
	}

	calcularPrecio(tiempo){
		return this.precioHora * tiempo.minutes;
	}

	getTiempoOcupacionParking( plaza , now ){
		let diferencia = now.getTime() - this.plazas[plaza].time.getTime();	
		console.log("diferencia:"+diferencia);
		var minutes = Math.round(diferencia/1000/60);	
		var hours = parseInt(diferencia/1000/60/60);		
		var days = parseInt(diferencia/(1000 * 3600 * 24));		
		return {'days': days, 'hours':hours,'minutes': minutes};
	}

	getPlazaLibre(){
		for (var i = 0; i < this.plazas.length; i++) {
			if( this.plazas[i] == false){
				return i;
			}
		}
		return false;
	}

	getPlazaOcupada( matricula ){
		for (var i = 0; i < this.plazas.length; i++) {
			if( this.plazas[i] !== false && this.plazas[i].matricula === matricula ){
				return i;
			}
		}
		return false;
	}

	ocuparPlaza(plaza, matricula, date){
		this.plazas[plaza] = {'matricula':matricula, 'time': new Date(date)};
	}

	getPlazas(){
		return this.plazas;
	}

	getNumPlazasLibres(){
		var numPlazasLibres = 0;
		for (var i = 0; i < this.plazas.length; i++) {
			if( this.plazas[i] === false){
				numPlazasLibres++;
			}
		}
		return numPlazasLibres;
	}

	getNumPlazasOcupadas(){
		var numPlazasOcupadas = 0;
		for (var i = 0; i < this.plazas.length; i++) {
			if( this.plazas[i] !== false){
				numPlazasOcupadas++;
			}
		}
		return numPlazasOcupadas;
	}

	validarMatricula(matricula){
				var regex = /([0-9]{4}-[a-zA-Z]{3})|([a-zA-Z]{1,2}-[0-9]{4}-[a-zA-Z]{2})/;
				return (regex.test(matricula));
	}	
}