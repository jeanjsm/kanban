<template>
  <div class="h-screen flex">
    <div class="w-64 px-8 py-4 bg-gray-100 border-r overflow-auto">
      <img
        class="h-8 w-8"
        src="https://api.adorable.io/avatars/196/abott@adorable.png"
        alt=""
      />
      <nav class="mt-8">
        <h2
          class="text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Issues
        </h2>
        <div class="mt-2 -mx-3">
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 bg-gray-200 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-900">All</span>
            <span class="text-xs font-semibold text-gray-700">36</span>
          </a>
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-700"
              >Assigned to me</span
            >
            <span class="text-xs font-semibold text-gray-700">2</span>
          </a>
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-700">Created by me</span>
            <span class="text-xs font-semibold text-gray-700">1</span>
          </a>
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-700">Archived</span>
          </a>
        </div>
        <h2
          class="mt-8 text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Tags
        </h2>
        <div class="mt-2 -mx-3">
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 bg-gray-200 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-900">All</span>
            <span class="text-xs font-semibold text-gray-700">36</span>
          </a>
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-700"
              >Assigned to me</span
            >
            <span class="text-xs font-semibold text-gray-700">2</span>
          </a>
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-700">Created by me</span>
            <span class="text-xs font-semibold text-gray-700">1</span>
          </a>
          <a
            href="#"
            class="flex justify-between items-center px-3 py-2 rounded-lg"
          >
            <span class="text-sm font-medium text-gray-700">Archived</span>
          </a>
        </div>
      </nav>
    </div>
    <div class="flex-1 min-w-0 flex flex-col bg-white">
      <div class="flex-shrink-0 border-b-2 border-gray-200">
        <header class="px-6">
          <div
            class="flex justify-between items-center py-3 border-b border-gray-200"
          >
            <div class="flex-1">
              <div class="relative w-64">
                <input
                  class="block w-full rounded-md border border-gray-400 pl-10 pr-4 py-3 text-gray-900 placeholder-gray-600"
                  type="text"
                  name=""
                  placeholder="Search"
                  id=""
                />
              </div>
            </div>
            <div class="flex items-center">
              <button>
                <svg class="h-6 w-6 text-gray-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z"
                  />
                </svg>
              </button>
              <button class="ml-6">
                <img
                  class="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.2&w=80&q=80"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between py-2">
            <div class="flex items-center">
              <h2 class="text-2xl font-semibold text-gray-900 leading-tight">
                All Issues
              </h2>
              <div class="ml-6 flex items-center">
                <span class="-ml-2 rounded-full border-2 border-white"
                  ><img
                    class="h-6 w-6 rounded-full object-cover"
                    src="https://api.adorable.io/avatars/48/adorable.png"
                    alt=""
                  />
                </span>
                <span class="-ml-2 rounded-full border-2 border-white"
                  ><img
                    class="h-6 w-6 rounded-full object-cover"
                    src="https://api.adorable.io/avatars/48/adorable.png"
                    alt=""
                  />
                </span>
                <span class="-ml-2 rounded-full border-2 border-white"
                  ><img
                    class="h-6 w-6 rounded-full object-cover"
                    src="https://api.adorable.io/avatars/48/adorable.png"
                    alt=""
                  />
                </span>
                <span class="-ml-2 rounded-full border-2 border-white"
                  ><img
                    class="h-6 w-6 rounded-full object-cover"
                    src="https://api.adorable.io/avatars/48/adorable.png"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <div class="flex">
              <span class="inline-flex p-1 border bg-gray-200 rounded">
                <button class="px-2 py-1 rounded">
                  <v-icon>mdi-menu</v-icon>
                </button>
                <button class="px-2 py-1 bg-white rounded shadow">
                  <svg
                    class="h-6 w-6 text-gray-500"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </span>
              <button
                class="ml-5 flex items-center pl-2 pr-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    fill="currentColor"
                    d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  />
                </svg>
                <span class="ml-1">New Issue</span>
              </button>
            </div>
          </div>
        </header>
      </div>
      <div class="flex-1 overflow-auto">
        <main class="p-3 h-full inline-flex">
          <div
            class="mr-3 flex-shrink-0 flex flex-col w-2/4 bg-gray-100 rounded-md"
            v-for="c in cols"
            :key="c"
          >
            <h3 class="flex-shrink-0 pt-3 pb-2 px-3 text-sm font-medium text-gray-700">Backlog {{ c }}</h3>
            <div class="flex-1 min-h-0 overflow-y-auto">
              <ul class="pt-0 pb-3 px-3">
                <li v-for="r in rep" :key="r">
                  <div
                    class="block p-5 mb-2 flex-shirink-0 bg-white rounded-md shadow"
                  >
                    <div>
                      <v-chip color="error" x-small>High</v-chip>
                    </div>
                    <div class="flex justify-between mt-2">
                      <p class="text-sm font-medium leading-snug text-gray-900">
                        {{ r }}
                      </p>
                    </div>
                    <div class="mb-2 pt-0">
                      <span>
                        <img
                          class="h-8 w-8 rounded-full"
                          src="https://api.adorable.io/avatars/196/abott@adorable.png"
                          alt=""
                        />
                      </span>
                    </div>
                    <div class="flex justify-between items-baseline">
                      <div class="text-sm text-gray-600 my-auto">
                        <time datetime="2020-05-11">Mai 11</time>
                      </div>
                      <svg
                        class="text-gray-600 my-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="18px"
                        height="18px"
                      >
                        <path
                          d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
                        />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rep: 7,
      cols: 5,
    };
  },
};
</script>

<style></style>
