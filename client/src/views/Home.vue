<template>
    <v-container style="height: 100%">
        <v-row>
            <v-col>
                <v-card           
                    rounded="2" 
                    color="white">
                    <v-card-title>
                        Landing page will developed soon
                    </v-card-title>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            outlined
                            large
                            :to="{name: 'Drive'}">
                            Go to drive
                        </v-btn>
                       <v-btn
                            color="secondary"
                            large
                            href="https://github.com/OctupusPrime/my-drive">
                            GitHub
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Home'
}
</script>