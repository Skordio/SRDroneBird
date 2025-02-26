<template>
    <v-container fluid class="mx-1 text-body-1 d-flex flex-column overflow-y-auto">
        <!-- <v-row class="flex-grow-0 d-flex align-center">
            <v-col cols="auto">
                <p class="text-h3">About</p>
            </v-col>
        </v-row> -->
        <v-row class="flex-grow-0">
            <v-col cols="12" md="6">
                <v-card class="about-card pa-3" elevation="10">
                    <p>
                        Hi, my name is Steven Wells.
                    </p>
                    <p>
                        SR DroneBird is my drone photography and videography company based in the Pocono Mountains, half an hour from Scranton.
                    </p>
                    <p>
                        I have been flying drones for three years as a personal hobby, and I am now looking to offer
                        my services as a drone videographer.
                    </p> 
                    <p>
                        If you would like to check out some of my flying, head over to the gallery section of this website -
                        there you can find several edited videos and short clips I've taken near Lake Wallenpaupack in the Pocono Mountains of Pennsylvania.
                    </p>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card class="about-card pa-3" elevation="10">
                    <p>
                        Drone List:    
                    </p>
                    <ul>
                        <li>
                            DJI Avata
                        </li>
                        <li>
                            iFlight Nazgul V3 HD
                        </li>
                    </ul>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col cols="6">
                <v-card class="about-card pa-3" elevation="10">
                    <p>
                        Note: I am currently in the process of obtaining my commercial drone license; I expect to have it around last-quarter 2024.  
                    </p>
                </v-card>
            </v-col>
        </v-row> -->
    </v-container>
</template>

<style lang="scss">
.about-card {
    background: rgba(221, 44, 0, 0.4) !important;
}
</style>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs"
import { useTitle } from "@vueuse/core"

const display = useDisplay()

const title = useTitle()


</script>
