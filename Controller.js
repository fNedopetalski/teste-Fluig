
let Controller = class Controller {
  constructor() {
    this._model = new Model(this)
    this._view = new View(this, this._model);

    this.carregaCampos()
  }

  carregaCampos() {
    var that = this;
    $(document).ready(function () {
      that._view.loadFilters()
      that._view.loadMasks()

      $("#cepCadastro").on("blur", event => {
        var loading = FLUIGC.loading(window);
        loading.show();
        setTimeout(function () {
          that.chamaCEP("cepCadastro", ["logradouroCadastro", "bairroCadastro", "cidadeCadastro", "estadoCadastro"])
          loading.hide();
        }, 100);
      });

      $("#cepEntrega").on("blur", event => {
        var loading = FLUIGC.loading(window);
        loading.show();
        setTimeout(function () {
          that.chamaCEP("cepEntrega", ["logradouroEntrega", "bairroEntrega", "cidadeEntrega", "estadoEntrega"])
          loading.hide();
        }, 100);
      });

      $("#btnCadastrarFilial").on("click", function (e) {
        var msg = ""
        $(".cadastro").find("label").each((index, el) => {
          if ($(el).attr("for") != undefined) {
            var id = $(el).attr("for")
            if ($(`#${id}`).val().trim() == "") {
              msg += `Prencha o campo ${$(el).text().split(":")[0]}. </br>`
            } else if (id == "codFilialCadastro") {
              var flag = false
              that._model.getCodFiliais().forEach(el=> {
                if (el.codigo == $(`#${id}`).val().trim()) {
                  flag = true
                }
              })
              if (flag) {
                msg += `Código filial já existente.  </br>`
              }
            }
          }
        })

        if (msg != "") {
          that.fluigToast("Atenção!</br>", msg, "danger")
        } else {
          $(".cadastro").hide()
          $(".entrega").show()
          $("#tituloPagina").text("Entrega")
        }
        e.preventDefault()
      })

      $("#btnConfirmarEntrega").on("click", function (e) {
        var msg = ""
        $(".entrega").find("label").each((index, el) => {
          if ($(el).attr("for") != undefined) {
            var id = $(el).attr("for")
            if ($(`#${id}`).val().trim() == "") {
              msg += `Prencha o campo ${$(el).text().split(":")[0]}. </br>`
            } 
          }
        })

        if (msg != "") {
          that.fluigToast("Atenção!</br>", msg, "danger")
        } else {
          $(".entrega").hide()
          $(".confirmaEntrega").show()
          $("#tituloPagina").text("Confirmar Entrega")
        }
        e.preventDefault()
      })

      $("#btnEnviar").on("click", function (e) {
        var msg = ""
        if ($("#confirmaEntrega").val() == "") {
          msg += "Realize a Confirmação da Entrega."
        } else if ($("#confirmaEntrega").val() == "nao" || $("#confirmaEntrega").val() == null) {
          if ($("#observacao").val() == ""){
            msg += "Preencha a observação com a justificativa."
          }
        }

        if (msg != "") {
          that.fluigToast("Atenção!</br>", msg, "danger")
        } else {
          $(".confirmaEntrega").hide()
          $("#tituloPagina").text("Solicitação Finalizada!")
        }
        e.preventDefault()
      })
    });
  }


  limpa_formulário_cep(arrCampos) {
    // Limpa valores do formulário de cep.
    arrCampos.forEach(el => $(`#${el}`).val("").attr("readonly", false))

  }

  chamaCEP(campoCEP, arrCampos) {


    //Nova variável "cep" somente com dígitos.
    var cep = $(`#${campoCEP}`).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        arrCampos.forEach(el => $(`#${el}`).val("..."))


        //Consulta o webservice viacep.com.br/
        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

          if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.
            $(`#${arrCampos[0]}`).val(dados.logradouro).attr("readonly", true);
            $(`#${arrCampos[1]}`).val(dados.bairro).attr("readonly", true);
            $(`#${arrCampos[2]}`).val(dados.localidade).attr("readonly", true);
            $(`#${arrCampos[3]}`).val(dados.uf).attr("readonly", true);

          } //end if.
          else {
            //CEP pesquisado não foi encontrado.
            this.limpa_formulário_cep(arrCampos);
            alert("CEP não encontrado.");
          }
        });
      } //end if.
      else {
        //cep é inválido.
        this.limpa_formulário_cep(arrCampos);
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      this.limpa_formulário_cep(arrCampos);
    }
  }

  fluigToast(title, message, type, timeout = 4000) {
		FLUIGC.toast({
			title,
			message,
			type,
			timeout
		});
	}

  getDataAtual() {
		Number.prototype.padLeft = function (base, chr) {
			var len = (String(base || 10).length - String(this).length) + 1;
			return len > 0 ? new Array(len).join(chr || '0') + this : this;
		}

		var d = new Date;
		var dformat = [d.getDate().padLeft(),
		(d.getMonth() + 1).padLeft(),
		d.getFullYear()].join('/');
		return dformat;
	}
}
