<template>
	<div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div><h4><p class="text-secondary"># Validator list</p></h4></div>
                <div class="row">
                    <div class="col">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Enter whatever key word you want to search..." 
                            v-model="filter" maxlenght="50" @keyup.enter="applyFilter">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" @click="applyFilter"
                                type="button">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th @click="sortBy('id')">id
                                <i :class="sortOrders['id'] > 0 ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up'">
                            </i>
                            </th>
                            <th @click="sortBy('address')">Address
                                <i :class="sortOrders['address'] > 0 ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up'">
                                </i>
                            </th>
                            <th @click="sortBy('pub_key')">Public key
                                <i :class="sortOrders['pub_key'] > 0 ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up'">
                                </i>
                            </th>

                            <th @click="sortBy('voting_power')">Voting power
                                <i :class="sortOrders['voting_power'] > 0 ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up'">
                                </i>
                            </th>
                            <th @click="sortBy('proposer_priority')">Proposer priority
                                <i :class="sortOrders['proposer_priority'] > 0 ? 'fa fa-long-arrow-down' : 'fa fa-long-arrow-up'">
                                </i>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-if="filteredAndSortedData.length>0">
                        <tr v-for='(validator, index) in filteredAndSortedData' :key='index+0'>
                            <td>{{ validator.id }}</td>
                            <td>{{ validator.address }}</td>
                            <td>
                                <span v-if="validator.pub_key">
                                    <li>type: {{validator.pub_key.type}}</li>
                                    <li>value: {{validator.pub_key.value}}</li>
                                </span>
                            </td>
                            <td>{{ validator.voting_power }}</td>
                            <td>{{ validator.proposer_priority }}</td>
                            <td>
                                <a href="#" v-on:click="updateValidator(validator,index)"
                                    class="btn btn-primary btn-sm">
                                    <i class="fa fa-pencil-square-o"></i> Update
                                </a>
                                <!-- <a href="#"
                                    class="btn btn-sm btn-danger"
                                    v-on:click="deleteValidator(validator.id)">
                                    <i class="fa fa-times"></i> Xóa
                                </a> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="pull-right">
                <pager :frame="8"
                        :pageCount="pageCount"
                        :page="page"
                        @change="changePage">
                </pager>
                </div>
            </div>
            <div class="col-md-4">
                <div>
                    <div><h4><p class="text-secondary"># Add new Validator</p></h4></div>
                    <div>
                        <form id="form-nguoi-dung" class="form-input">
                            <div class="form-row">
                                <div class="col-md-12 form-group">
                                    <label for="inputAddress">Address</label>
                                    <input class="form-control" type="text" placeholder="Address" id="inputAddress"
                                    v-model="validator.address" maxlength="50"
                                    v-on:input="$v.validator.address.$touch">
                                    <div v-if="$v.$error">
                                        <p class="text-danger" v-if="!$v.validator.address.required">Address is required.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-6 form-group">
                                    <label for="inputPubkeyType">Public key [type]</label>
                                    <input class="form-control" type="text" placeholder="Public key type" id="inputPubkeyType"
                                    v-model="validator.pub_key.type" maxlength="50"
                                    v-on:input="$v.validator.pub_key.type.$touch">
                                    <div v-if="$v.$error">
                                        <p class="text-danger" v-if="!$v.validator.pub_key.type.required">Public key type is required.</p>
                                    </div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label for="inputPubkeyValue">Public key [value]</label>
                                    <input class="form-control" type="text" placeholder="Public key value" id="inputPubkeyValue"
                                    v-model="validator.pub_key.value" maxlength="50"
                                    v-on:input="$v.validator.pub_key.value.$touch">
                                    <div v-if="$v.$error">
                                        <p class="text-danger" v-if="!$v.validator.pub_key.value.required">Public key value is required.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12 form-group">
                                    <label for="inputVotingPower">Voting power</label>
                                    <input class="form-control" type="text" placeholder="Voting power" id="inputVotingPower"
                                    v-model="validator.voting_power" minlength="10" maxlength="50"
                                    v-on:input="$v.validator.voting_power.$touch">
                                    <div v-if="$v.$error">
                                        <p class="text-danger" v-if="!$v.validator.voting_power.required">Voting power is required.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12 form-group">
                                    <label for="inputProposerPriority">Proposer priority</label>
                                    <input class="form-control" type="text" placeholder="Proposer priority"
                                    id="inputProposerPriority"
                                    v-model="validator.proposer_priority" maxlength="50"
                                    v-on:input="$v.validator.proposer_priority.$touch">
                                    <div v-if="$v.$error">
                                        <p class="text-danger" v-if="!$v.validator.proposer_priority.required">Proposer priority is required.</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <a href="#" class="btn btn-success"
                        @click.prevent="saveValidator()">
                        <span class="icon is-small">
                            <i class="fa fa-check"></i>Save
                        </span>
                        </a>
                        <a href="#" class="btn btn-primary" @click.prevent="refreshValidator()">
                            <span class="icon is-small">
                                <i class="fa fa-refresh"></i>
                            </span>
                            <span>Add Validator</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pdfobj from 'pdfobject'
import { mapGetters, mapActions } from 'vuex'
import Pager from './Pager'
import datePicker from 'vue-bootstrap-datetimepicker'
import Loading from 'vue-loading-overlay'
import { validationMixin } from 'vuelidate'
import { required,maxLength } from 'vuelidate/lib/validators';

export default {
    components: { Pager },
    mixins: [validationMixin],
    data: function () {
      return {
        processing:false,
        validator:{
          address:null,
          pub_key:{},
          voting_power:null,
          proposer_priority:null,
          id:0,
          index:-1
        },
        sortKey:'', 
        sortOrders: [],
        columns: ['id','address','pub_key','voting_power','proposer_priority'],
      }
    },
    validations: {
        validator: {
            address: {
                required,
                maxLength:maxLength(50)
            },
            pub_key:{
                type: {
                    required,
                    maxLength:maxLength(50)
                },
                value:{
                    required,
                    maxLength:maxLength(50)
                }
            },
            voting_power: {
                required,
                maxLength:maxLength(50)
            },
            proposer_priority: {
                required,
                maxLength:maxLength(50)
            }
        }           
    },
    computed: {
      ...mapGetters('validators', ['pageCount', 'page', 'filter']),
      filter:{
            get: function(){
                return this.$store.state.validators.filter;
            },
            set: function(text){
                this.$store.commit('validators/setFilter',text);
            }
        },
        filteredAndSortedData:{
            get: function(){
                let vm=this;
                let sortKey = vm.sortKey;
                let order = vm.sortOrders[sortKey] || 1;
                // Apply filter first
                let result = vm.$store.state.validators.validators;
                if (vm.filter) {
                    result = result.filter(item =>vm.searchLike(item));
                }
                // Sort the remaining values
                if(vm.sortKey==='') return result;
                
                vm.sortKey='';
                return result.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }
        }
    },
    methods: {
      ...mapActions('validators', ['getValidators', 'changePage', 'applyFilter']),
      
      applySearch () {
        this.applyFilter(this.$refs.search.value.trim())
      },
      clearSearch () {
        this.applyFilter('')
      },
      updateValidator(item,index){
          this.validator=item
          this.validator.index=index
      },
    async deleteValidator(id) {
        if (confirm("Do you want to delete?")) {
            let co=await this.$store.dispatch('users/deleteValidator',id)
            if(co){
                this.getValidators()
                this.$notify({
                    title: 'Message',
                    text: 'Item deleted !!!'
                });
            }else{
                this.$notify({
                    type: 'error',
                    title: 'Message',
                    text: 'opp, something wrong please check again !!!'
                });
            }
        }
    },
    _validations () {
        return new Promise(resolve => {
            if (this.$v.$error || !this.$v.$pending) {
                return resolve()
            }
            let poll = setInterval(() => {
            if (!this.$v.$pending) {
                clearInterval(poll)
                resolve()
            }
            }, 200)
        })
    },

    async isValid () {
        this.$v.$reset()
        this.$v.$touch()
        await this._validations()
        return Promise.resolve(!this.$v.$error)
    },

    async saveValidator() {
        const isValid = await this.isValid()
        if (!isValid) {
            return 
        }

        var app = this;
        if (app.processing === true) {
            return;
        } 

        app.processing = true;
        app.$store.dispatch('validators/addOrUpdate',app.validator)
        .then(function (resp) {
            app.validator.id=resp.data.data.id
                app.getValidators()

                app.$notify({
                    title: 'Message',
                    text: 'saved success !!!'
                });
                app.processing = false;
        })
        .catch(function (resp) {
            app.$notify({
                type: 'warn',
                title: 'Message',
                text: 'Opp, something wrong please check again !!!'
            });
            app.processing = false;
        });
      },
      update(validator,index){
          this.validator=validator
          this.validator.index=index
      },
      refreshValidator() {
          this.validator={address:null,pub_key:{type:null,value:null},voting_power:null,proposer_priority:null}
      },
      searchLike:function(item){
          return item.address.includes(this.filter)
          ||item.pub_key.toString().includes(this.filter)
          ||item.voting_power.includes(this.filter)
          ||item.proposer_priority.includes(this.filter)
      },
      sortBy: function(sortKey) { 
          this.sortKey = sortKey;
          this.sortOrders[sortKey] = this.sortOrders[sortKey] * -1;
      }
    },
    mounted () {
        let vm=this
        vm.columns.forEach(function (key) {
            vm.sortOrders[key] = 1;
        });
        vm.getValidators()
    }
  }
</script>

<style scoped>
.form-row .col{
    margin-left: 0px !important;
    margin-right: 0px !important;
}

.list-group-item{
    text-align: center;
    padding: 0.75rem 0.25rem !important;
}
@media (min-width: 1200px) {
   .modal-xlg {
      width: 90%; 
   }
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: top;
}

.modal-dialog,
.modal-content {
    height: 80%;
}

.modal-body {
    max-height: calc(100% - 120px);
    overflow-y: scroll;
}
.pdfobject-container { width: 100%; height: 55rem; border: 1rem solid rgba(0,0,0,.1); }

div.outside-row{
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>