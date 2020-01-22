<template>
    <div>
        <x-header :title="'账号管理'" :left-options="{backText:''}">
        	<div slot="right">
                <vue-header-nav></vue-header-nav>
            </div>
        </x-header>
        <group>
            <cell :title="'账号修改'" is-link link="usersetupcphone">
                <!--<span class="name" style="color: #35495e;">这是介绍</span>-->
            </cell>
            <cell :title="'忘记密码'" is-link link="/login/usersetupfpassword">
                <!--<span class="name" style="color: #35495e;">这是介绍</span>-->
            </cell>
        </group>
    </div>
</template>

<script>
    import { XHeader, Group, Cell } from 'vux'
    import { VueHeaderNav} from '../../component/'
    export default {
        components: {
            XHeader,
            Group,
            Cell,
            VueHeaderNav
        },
    }
</script>

<style>

</style>