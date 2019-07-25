<template>
    <div>
        <div>
            <Navigation></Navigation>
        </div>
        
        <router-view></router-view>
        <notifications/>
    </div>
</template>
<style lang="scss">
    @import '../node_modules/bootstrap/scss/bootstrap.scss';
    $fa-font-path: '../node_modules/font-awesome/fonts/';
    @import '../node_modules/font-awesome/scss/font-awesome.scss';
    @import 'node_modules/bootstrap/scss/bootstrap';
    // Import stylesheet
    @import 'vue-loading-overlay/dist/vue-loading.css';

    // Import required dependencies 
    @import 'bootstrap/dist/css/bootstrap.css';
    // Import date picker css
    @import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
</style>
<style lang="css">
    @import '../node_modules/vue-toastr-2/dist/vue-toastr-2.min.css';
</style>

<script>
import Navigation from './components/navigation/navigation'
export default {
    name: 'app',
    components: {
        'Navigation': Navigation
    }
};
</script>
