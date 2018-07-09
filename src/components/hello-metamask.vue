<template>
  <div class='metamask-info'>
    <span v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Connected to </span>
    <span v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> No wallet found</span>
    <span>{{ network }} ⛓</span>
    <!-- <span> ⛓ {{ network }}, 💻 {{ coinbase }}, 💲{{ ethBalance }} ETH</span> -->
  </div>
</template>

<script>
import {NETWORKS} from '../util/constants/networks'
import {mapState} from 'vuex'
export default {
  name: 'hello-metamask',
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
    balance: state => state.web3.balance,
    ethBalance: state => {
      if (state.web3.web3Instance !== null) return state.web3.web3Instance().utils.fromWei(state.web3.balance.toString(), 'ether')
    }
  })
}
</script>

<style scoped>
p {
  color: grey;
}
.metamask-info {
  text-align:center;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}</style>
