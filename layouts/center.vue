<template>
    <v-app>
        <v-main minHeight="100vh">
            <div class="h-100 d-flex flex-column justify-center">
                <div class="w-100 d-flex justify-center">
                    <div>
                        <slot />
                    </div>
                </div>
            </div>
        </v-main>
        <the-footer />
    </v-app>
</template>
