<template>
  <q-page>
    <div class="bg-wave flex justify-center content-center">
      <div class="text-white flex justify-center content-center column">
        <div
          class="flex justify-center q-mb-lg"
          style="height: 130px; width: 130px"
        >
          <q-img src="../assets/logo.png" />
          <p class="text-h6 text-uppercase text-center q-mb-lg">
            {{ appName }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex content-center justify-center" style="height: fit-content">
      <form
        @submit.prevent="submit"
        style="width: 420px; max-width: 100%; margin: 0px auto"
      >
        <q-card class="q-py-lg q-px-lg q-mx-lg q-mb-lg">
          <p class="text-h6 q-mx-md">Create an account</p>
          <div class="q-mb-lg q-mx-md">
            <q-input
              outlined
              type="email"
              lazy-rules
              :rules="nameRules"
              v-model="email"
              required
              label="Email"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>
          <div class="q-my-lg q-mx-md">
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="fullName"
              label="Full Name"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <div class="q-my-lg q-mx-md">
            <q-input
              outlined
              required
              v-model="password"
              :rules="[
                (val) =>
                  val.length >= 8 || 'Must be at least 8 characters long',
              ]"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="q-my-lg q-mx-md">
            <q-input
              required
              outlined
              :rules="nameRules"
              v-model="con_password"
              label="Confirm Password"
              :type="isConPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConPwd = !isConPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="q-my-lg q-mx-md">
            <q-select
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="country"
              label="Country"
              :options="countries"
            >
              <template v-slot:prepend>
                <q-icon name="map" />
              </template>
            </q-select>
          </div>
          <div class="q-my-lg q-mx-md">
            <q-input
              required
              outlined
              :rules="nameRules"
              v-model="phone"
              mask="(###) ### - ### - ####"
              unmasked-value
              label="Phone Number"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>
          <!-- <div class="q-my-lg q-mx-md">
            <q-input
              outlined
              v-model="refCode"
              hint="Optional *"
              label="Refferal Code"
            >
              <template v-slot:prepend>
                <q-icon name="code" />
              </template>
            </q-input>
          </div> -->
          <div class="q-my-lg q-mx-md">
            <q-toggle required v-model="agree" color="primary" keep-color />
            <router-link :to="{ name: 'terms' }">I agree with the</router-link>
            Terms and Conditions
          </div>
          <!-- <div class="q-my-lg q-mx-md">
            <q-file
              required
              bottom-slots
              v-model="file"
              counter
              accept="image/*"
              @change="fileUpload"
              hint="Upload Your Photo"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="model = null"
                  class="cursor-pointer"
                />
              </template>
            </q-file>
          </div> -->
          <div class="q-my-lg q-mx-md">
            <q-btn
              color="pink-8"
              type="submit"
              label="submit"
              size="17px"
              elevated
              :disable="disable"
            />
          </div>
          <div class="q-mx-md flex">
            <p class="text-subtitle1">Have an account?</p>
            <router-link to="/login"
              ><p class="text-subtitle1 q-mx-sm text-pink-8">
                Login
              </p></router-link
            >
          </div>
        </q-card>
      </form>
    </div>
    <q-dialog v-model="icon" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="flex justify-center colunm">
          <q-avatar size="70px" class="q-my-md q-mx-md">
            <q-img src="../assets/icons8-checkmark-48.png" />
          </q-avatar>
          <div class="text-center">
            <p>
              You have successfully created your account. Please click the copy
              button or take a screenshot of your account number.
            </p>
            <p class="text-weight-bold">{{ accountNum }}</p>
            <q-btn @click="copy" label="copy account number" color="primary" />
          </div>
          <div class="q-my-md" style="margin-left: auto">
            <q-btn @click="ok" class="no-box-shadow no-border no-outline no-border-radius" label="OK" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-ajax-bar
      ref="bar"
      position="top"
      color="red-8"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>
<script>
import { ref, defineComponent } from "vue";
import { userSignup } from "../stores/signup";
import { notification } from "../stores/notification";
import rn from "random-number";
import copyTXT from "copy-to-clipboard";

export default defineComponent({
  setup() {
    const email = ref(null);
    const fullName = ref(null);
    const bar = ref(null);
    const country = ref(null);
    const social = ref(null);
    const phone = ref(null);
    const password = ref(null);
    const con_password = ref(null);
    const refCode = ref("");
    const appName = import.meta.env.VITE_APP_NAME;
    const notify = notification();
    const { signup } = userSignup();
    const disable = ref(false);
    const agree = ref(false);
    const icon = ref(false);
    const accountNum = ref(null);

    const options = {
      integer: true,
      min: 100_000_000_0,
      max: 900_000_000_0,
    };

    const nun = rn(options);
    const copy = () => {
      copyTXT(nun);
      notify.alert("positive", "check", "Account number copied to clipboard!");
    };

    const ok = () => {
      return (
        notify.alert("positive", "check", "Signup successfull!"),
        (location.href = location.protocol + "//" + location.host + "/login")
      );
    };

    // const file = ref(null);

    // const fileUpload = (t) => {
    //   file.value = t.target.files[0];
    // };

    const submit = () => {
      accountNum.value = nun;
      const barRef = bar.value;
      disable.value = true;
      if (!agree.value) {
        disable.value = false;
        return notify.alert(
          "negative",
          "report_problem",
          "Accept our terms and condictions"
        );
      }

      barRef.start();

      if (password.value !== con_password.value) {
        barRef.stop();

        return notify.alert(
          "negative",
          "report_problem",
          "Confirm Password does not match Password"
        );
      }

      const form = new FormData();
      // form.append("file", file.value);
      form.append("email", email.value);
      form.append("fullName", fullName.value);
      form.append("country", country.value);
      form.append("social", social.value);
      form.append("phone", phone.value);
      form.append("password", password.value);
      form.append("refCode", refCode.value);
      form.append("accountNumber", accountNum.value);

      signup(form, (data) => {
        const { error, success } = data;
        if (error) {
          barRef.stop();
          disable.value = false;
          return notify.alert("negative", "report_problem", error);
        }
        if (success) {
          barRef.stop();
          icon.value = true;
        }
      });
    };

    return {
      bar,
      email,
      fullName,
      phone,
      agree,
      copy,
      ok,
      // social,
      disable,
      country,
      appName,
      refCode,
      // file,
      password,
      accountNum,
      // fileUpload,
      con_password,
      passwordValue: ref(null),
      nameRules: [
        (val) => (val && val.length > 0) || "Please fill out this field",
      ],
      submit,
      icon,
      isPwd: ref(true),
      isConPwd: ref(true),
      countries: [
        "Afghanistan (؋)",
        "Albania (Lek)",
        "Algeria (دج)",
        "American Samoa ($)",
        "Andorra (€)",
        "Angola (Kz)",
        "Anguilla ($)",
        "Antarctica ($)",
        "Antigua and Barbuda ($)",
        "Argentina ($)",
        "Armenia (֏)",
        "Aruba (ƒ)",
        "Australia ($)",
        "Austria (€)",
        "Azerbaijan (AZN)",
        "Bahamas ($)",
        "Bahrain (د.)",
        "Bangladesh (ó)",
        "Barbados ($)",
        "Belarus (Br)",
        "Belgium (€)",
        "Belize ($)",
        "Benin (CFA)",
        "Bermuda ($)",
        "Bhutan (Nu)",
        "Bolivia (Bs)",
        "Bosnia and Herzegovina (KM)",
        "Botswana (P)",
        "Bouvet Island (kr)",
        "Brazil (R$)",
        "British Indian Ocean Territory ($)",
        "Brunei Darussalam (B$)",
        "Bulgaria (Лв.)",
        "Burkina Faso (CFA)",
        "Burundi (FBu)",
        "Cambodia (៛)",
        "Cameroon (FCFA)",
        "Canada ($)",
        "Cape Verde ($)",
        "Cayman Islands ($)",
        "Central African Republic (FCFA)",
        "Chad (FCFA)",
        "Chile ($)",
        "China (¥)",
        "Christmas Island ($)",
        "Cocos (Keeling) Islands ($)",
        "Colombia ($)",
        "Comoros (CF)",
        "Congo (FC)",
        "Democratic Republic of the Congo (FC)",
        "Cook Islands ($)",
        "Costa Rica (₡)",
        "Cote D'Ivoire (CFA)",
        "Croatia (Kn)",
        "Cuba ($)",
        "Cyprus (€)",
        "Czech Republic (Kč)",
        "Denmark (kr)",
        "Djibouti (Fdj)",
        "Dominica ($)",
        "Dominican Republic (RD$)",
        "Ecuador (S/.)",
        "Egypt (E£)",
        "El Salvador (₡)",
        "Equatorial Guinea (FCFA)",
        "Eritrea (Nkf)",
        "Estonia (kr)",
        "Ethiopia (Br)",
        "Falkland Islands [Malvinas] (£)",
        "Faroe Islands (kr)",
        "Fiji (FJ$)",
        "Finland (mk)",
        "France (€)",
        "French Guiana (€)",
        "French Polynesia (F)",
        "French Southern Territories (€)",
        "Gabon (FCFA)",
        "Gambia (D)",
        "Georgia (GEL)",
        "Germany (€)",
        "Ghana (GH₵)",
        "Gibraltar (£)",
        "Greece (€)",
        "Greenland (Kr.)",
        "Grenada ($)",
        "Guadeloupe (€)",
        "Guam ($)",
        "Guatemala (Q)",
        "Guernsey (£)",
        "Guinea (FG)",
        "Guinea-Bissau (CFA)",
        "Guyana (G$)",
        "Haiti (G)",
        "Heard Island and McDonald Islands ($)",
        "Holy See [Vatican City State] (₤)",
        "Honduras (HNL)",
        "Hong Kong (HK$)",
        "Hungary (Ft)",
        "Iceland (kr)",
        "India (₹)",
        "Indonesia (Rp)",
        "Islamic Republic of Iran (IRR)",
        "Iraq (د.ع)",
        "Ireland (€)",
        "Isle of Man (£)",
        "Israel (₪)",
        "Italy (€)",
        "Jamaica (J$)",
        "Japan (¥)",
        "Jersey (£)",
        "Jordan (د.ا)",
        "Kazakhstan (₸)",
        "Kenya (KSh)",
        "Kiribati ($)",
        "Democratic People's Republic of Korea (₩)",
        "Republic of Korea (₩)",
        "Kuwait (د.ك)",
        "Kyrgyzstan (лв)",
        "Lao People's Democratic Republic (₭)",
        "Latvia (LVL)",
        "Lebanon (ل.ل)",
        "Lesotho (L)",
        "Liberia (L$)",
        "Libyan Arab Jamahiriya (LD)",
        "Liechtenstein (CHF)",
        "Lithuania (Lt)",
        "Luxembourg (€)",
        "Macao (MOP$)",
        "The Former Yugoslav Republic of Macedonia (den)",
        "Madagascar (Ar)",
        "Malawi (K)",
        "Malaysia (RM)",
        "Maldives (Rf)",
        "Mali (MAF)",
        "Malta (€)",
        "Marshall Islands ($)",
        "Martinique (€)",
        "Mauritania (MRU)",
        "Mauritius (₨)",
        "Mayotte (€)",
        "Mexico ($)",
        "Federated States of Micronesia ($)",
        "Republic of Moldova (L)",
        "Monaco (€)",
        "Mongolia (₮)",
        "Montenegro (€)",
        "Montserrat ($)",
        "Morocco (MAD)",
        "Mozambique (MT)",
        "Myanmar (K)",
        "Namibia (N$)",
        "Nauru ($)",
        "Nepal (Rs)",
        "Netherlands (ANG)",
        "Netherlands Antilles (NAf)",
        "New Caledonia (F)",
        "New Zealand ($)",
        "Nicaragua (C$)",
        "Niger (XOF)",
        "Nigeria (₦)",
        "Niue ($)",
        "Norfolk Island ($)",
        "Northern Mariana Islands ($)",
        "Norway (kr)",
        "Oman (ر.ع.)",
        "Pakistan (₨)",
        "Palau ($)",
        "Occupied Palestinian Territory ($)",
        "Panama (B/)",
        "Papua New Guinea (K)",
        "Paraguay (₲)",
        "Peru (S/)",
        "Philippines (₱)",
        "Pitcairn ($)",
        "Poland (zł)",
        "Portugal (€)",
        "Puerto Rico ($)",
        "Qatar (QR)",
        "Reunion (€)",
        "Romania (lei)",
        "Russian Federation (₽)",
        "Rwanda (FRw)",
        "Saint Barthélemy (€)",
        "Saint Helena (£)",
        "Saint Kitts and Nevis ($)",
        "Saint Lucia ($)",
        "Saint Martin (ƒ)",
        "Saint Pierre and Miquelon (€)",
        "Saint Vincent and the Grenadines (X$)",
        "Samoa ($)",
        "San Marino (€)",
        "Sao Tome and Principe (Db)",
        "Saudi Arabia (﷼)",
        "Senegal (CFA)",
        "Serbia (din)",
        "Seychelles (SCR)",
        "Sierra Leone (Le)",
        "Singapore (S$)",
        "Slovakia (SKK)",
        "Slovenia (€)",
        "Solomon Islands (Si$)",
        "Somalia (Sh.so.)",
        "South Africa (R)",
        "South Georgia and the South Sandwich Islands (£)",
        "Spain (€)",
        "Sri Lanka (Rs)",
        "Sudan (£SD)",
        "Suriname ($)",
        "Svalbard and Jan Mayen (kr)",
        "Swaziland (L)",
        "Sweden (kr)",
        "Switzerland (CHf)",
        "Syrian Arab Republic (LS)",
        "Taiwan, Province Of China (NT$)",
        "Tajikistan (SM)",
        "United Republic of Tanzania (TSh)",
        "Thailand (฿))",
        "Timor-Leste ($)",
        "Togo (CFA)",
        "Tokelau ($)",
        "Tonga (T$)",
        "Trinidad and Tobago (TT$)",
        "Tunisia (د.ت)",
        "Turkey (₺)",
        "Turkmenistan (T)",
        "Turks and Caicos Islands ($)",
        "Tuvalu ($)",
        "Uganda (USh)",
        "Ukraine (₴)",
        "United Arab Emirates (د.إ)",
        "United Kingdom (£)",
        "United States ($)",
        "United States Minor Outlying Islands ($)",
        "Uruguay ($)",
        "Uzbekistan (лв)",
        "Vanuatu (VT)",
        "Venezuela (Bs.)",
        "Vietnam (₫)",
        "British, Virgin Islands ($)",
        "U.S., Virgin Islands ($)",
        "Wallis And Futuna (Fr)",
        "Western Sahara (د.م.)",
        "Yemen (﷼)",
        "Zambia (ZK)",
        "Zimbabwe (Z$)",
      ],
    };
  },
});
</script>
<style>
.bg-wave {
  background: url("../assets/wave.svg") no-repeat center;
  background-size: cover;
  height: 300px;
  width: 100%;
}
a {
  text-decoration: none;
}
</style>
