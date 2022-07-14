$(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyC_Lz-HIXHPz90MM_8vERto3dUK1rGts44",
        authDomain: "igreja-batista-campos-brancos.firebaseapp.com",
        databaseURL: "https://igreja-batista-campos-brancos-default-rtdb.firebaseio.com",
        projectId: "igreja-batista-campos-brancos",
        storageBucket: "igreja-batista-campos-brancos.appspot.com",
        messagingSenderId: "724470922283",
        appId: "1:724470922283:web:fcf1eaf1f43df1d48dfe6e",
        measurementId: "G-WKZFS0PDDY"
    };
    
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const db = firebase.firestore();

    $("#bTeste").click(() => {
        auth.signInWithPopup(provider).then(() => {
            //alert("Logado com sucesso!");
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
    });

    $("#bEnviar").click(function(){
        let nome = $("#nome").val();
        let whatsapp = $("#whatsapp").val();
        let pedido = $("#pedido").val();
        let publico = $("#publico").is(':checked');

        db.collection('pedidos').add({
            nome: nome,
            whatsapp: whatsapp,
            pedido: pedido,
            publico: publico
        });

        alert("Enviado com sucesso!");
    });

    db.collection('pedidos').onSnapshot((data) => {
        let list = $(".lista");
        list.html("");

        data.docs.map((val) => { //Similar ao foreach do PHP
            list.html(list.html() + `${val.data().nome}<br/>`);
        });
    });

    /*auth.onAuthStateChanged((val) =>{
        if(val){
            alert('Logado com sucesso!');
        }
    });*/
});