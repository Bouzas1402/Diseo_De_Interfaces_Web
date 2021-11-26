class App{

	constructor(){
		this.date = new Date();
		this.parking = new Parking(5);
	}

	generateRandom(min, max){
		Math.floor(
				Math.random() * (max - min)
			) + min;
	}

	getDate(){
		return this.date;
	}

	sumMinute(){
		var m = 1;
		this.date.setMinutes(this.date.getMinutes()+m)
	}

	sumHour(){
		var h = 1;
		this.date.setHours(this.date.getHours()+1)
		document.getElementById("date").innerHTML = this.formatDate(this.date);
	}

	sumDay(){
		var d = 1;
		this.date(this.date() + (d*24*60*60*1000));
	}

	setDate(newDate){
		this.date = newDate;
	}

	
	aparcar(plaza){
		this.parking.aparcar(this.date, plaza);
	}

	desAparcar(matricula){
		this.parking.desAparcar(this.date , matricula);
	}

	formatDate( objFecha ){
		return objFecha.getDate()+"/"+(objFecha.getMonth()+1)+"/"+objFecha.getFullYear()+" "+objFecha.getHours()+":"+objFecha.getMinutes();
	}

	printParking(){
		var cabecera = "<tr><th>Plaza</th><th>Estado</th><th>Matrícula</th><th>Hora</th><th>Acciones</th></tr>";
		var output = cabecera;
		for (var i = 0; i < this.parking.plazas.length; i++) {
			if(this.parking.plazas[i] !== false){
				output += "<tr><td>"+(i+1)+"</td><td>Ocupado</td><td>"+this.parking.plazas[i].matricula+"</td>"+
				"<td>"+app.formatDate(this.parking.plazas[i].time)+"</td>"+
				"<td><a class='btn btn-danger' href='#' onclick=\"app.desAparcar('"+ this.parking.plazas[i].matricula + "')\"><span class='bi-smartwatch me-1'></span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-smartwatch\" viewBox=\"0 0 16 16\">" +
					"  <path d=\"M9 5a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5V5z\"/>" +
					"  <path d=\"M4 1.667v.383A2.5 2.5 0 0 0 2 4.5v7a2.5 2.5 0 0 0 2 2.45v.383C4 15.253 4.746 16 5.667 16h4.666c.92 0 1.667-.746 1.667-1.667v-.383a2.5 2.5 0 0 0 2-2.45V8h.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14v-.5a2.5 2.5 0 0 0-2-2.45v-.383C12 .747 11.254 0 10.333 0H5.667C4.747 0 4 .746 4 1.667zM4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3z\"/>" +
					"</svg>Desaparcar</span></a></tr>";
			}else{
				output += "<tr><td>"+(i+1)+"</td><td>Libre</td><td></td><td></td><td>"+
				"<a class='btn btn-success' aria-current='page' href='#' id='btnAparcar' onclick='app.aparcar(" + i +")'><span class='bi-speedometer2 me-1'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-speedometer2\" viewBox=\"0 0 16 16\">" +
					"  <path d=\"M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z\"/>" +
					"  <path fill-rule=\"evenodd\" d=\"M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z\"/>" +
					"</svg> Aparcar</span></a>"+
				"</td></tr>";	
			}
		}
		document.getElementById("parking").innerHTML = output;
	}

	printHistory(){
		var cabecera = "<tr><th>Plaza</th><th>Matricula</th><th>Start</th><th>Finish</th><th>Time</th><th>Price</th></tr>";
		var output = cabecera;
		for (var i = 0; i < this.parking.history.length; i++) {
			var item = this.parking.history[i];
		
			output += "<tr>"+
			"<td>"+(item.plaza+1)+"</td><td>"+item.matricula+"</td>"+
			"<td>"+app.formatDate(item.start)+"</td>"+
			"<td>"+app.formatDate(item.finish)+"</td>"+
			"<td>"+item.time.days+" days | "+ item.time.hours+":"+item.time.minutes+"</td>"+
			"<td>"+item.price+"</td>"+
			"</tr>";
		
		}
		document.getElementById("history").innerHTML = output;
	}

	ocultarMensaje(){
		var itemMsg = document.getElementById("msg");
		itemMsg.classList.add('hidden');
		//itemMsg.fadeOut();
	}

	mostrarMensaje(msg){
		var itemMsg = document.getElementById("msg");
		itemMsg.classList.remove('hidden');
		document.getElementById("msg").innerHTML = msg;
		setInterval("app.ocultarMensaje()",5000)
	}

	mostrarFecha(){
		document.getElementById("date").innerHTML = this.formatDate(this.date);
	}

	mostrarCajero(){
		document.getElementById("cajero").innerHTML = "<span class='bi-coin me-1'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-coin\" viewBox=\"0 0 16 16\">\n" +
			"  <path d=\"M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z\"/>\n" +
			"  <path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z\"/>\n" +
			"  <path d=\"M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z\"/>\n" +
			"</svg></span>"+this.parking.cajero;
	}

	calcularPorcentajeOcupacion(){
		return ((this.parking.getNumPlazasOcupadas()*100)/this.parking.getPlazas().length);
	}

	refreshBarOcupacion(){
		var status = 'success';
		var ocupacion = '';
		var ocupacion = this.calcularPorcentajeOcupacion();
		switch(true){
			case ocupacion < 50:
				status = 'success';
				break;
			case ocupacion >= 50 && ocupacion < 80:
				status = 'warning';
				break;
			case ocupacion >= 80:
				status = 'danger';
				break;

		}
		document.getElementById("barOcupacion").classList = "progress-bar bg-"+status;
		document.getElementById("barOcupacion").style.width = this.calcularPorcentajeOcupacion()+"%";
		document.getElementById("barOcupacion").textContent = this.calcularPorcentajeOcupacion()+"%";
	}

	actualizarPantalla(){
		this.mostrarCajero();
		this.refreshBarOcupacion();
		this.mostrarFecha();
		this.printParking();
		this.printHistory();
	}
}