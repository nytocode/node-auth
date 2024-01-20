const signin_form = document.querySelector("#signin-form");
const signup_form = document.querySelector("#signup-form");
const logout_btn = document.querySelector("#btn-logout");
const edit_form = document.querySelector("#edit-form");

const baseUrl = "https://node-auth-otpd.onrender.com";
// const baseUrl = "http://localhost:3000";

enum AlertType {
  Error,
  Success,
}

const login = async (email: string, password: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if ((await res.json()).status === "success") {
      alert("Login successful!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    }
  } catch (error: any) {
    alert(error.message);
  }
};

if (signin_form) {
  signin_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email")?.value;
    const password =
      document.querySelector<HTMLInputElement>("#password")?.value;
    if (email && password) {
      login(email, password);
    }
  });
}

const register = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    if ((await res.json()).status === "success") {
      alert("Register successful!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1500);
    }
  } catch (error: any) {
    alert(error.message);
  }
};

if (signup_form) {
  signup_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email")?.value;
    const password =
      document.querySelector<HTMLInputElement>("#password")?.value;
    const name = document.querySelector<HTMLInputElement>("#name")?.value;
    if (email && password && name) {
      register({ email, name, password });
    }
  });
}

const logout = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/signout`);

    if ((await res.json()).status === "success") {
      alert("Logout successful!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  } catch (error: any) {
    alert(error.message);
  }
};

if (logout_btn) {
  logout_btn.addEventListener("click", () => {
    logout();
  });
}

const update = async ({ name }: { name: string }) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/user/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if ((await res.json()).status === "success") {
      alert("Update successful!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  } catch (error) {
    alert(error.message);
  }
};

if (edit_form) {
  edit_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector<HTMLInputElement>("#name")?.value;
    if (name) {
      update({ name });
    }
  });
}
