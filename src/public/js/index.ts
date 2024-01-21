const signin_form = document.querySelector("#signin-form");
const signup_form = document.querySelector("#signup-form");
const logout_btn = document.querySelector("#btn-logout");
const edit_form = document.querySelector("#edit-form");
const edit_password_form = document.querySelector("#edit-password-form");
const forgot_password_form = document.querySelector("#forgot-password-form");
const reset_password_form = document.querySelector("#reset-password-form");

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
      }, 1000);
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
      }, 1000);
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
        window.location.assign("/");
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

const updatePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    if ((await res.json()).status === "success") {
      alert("Update successful!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    }
  } catch (error) {
    alert(error.message);
  }
};

if (edit_password_form) {
  edit_password_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const oldPassword =
      document.querySelector<HTMLInputElement>("#old-password")?.value;
    const newPassword =
      document.querySelector<HTMLInputElement>("#new-password")?.value;
    if (oldPassword && newPassword) {
      updatePassword({ oldPassword, newPassword });
    }
  });
}

const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if ((await res.json()).status === "success") {
      alert("Check your email inbox!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    }
  } catch (error) {
    alert(error.message);
  }
};

if (forgot_password_form) {
  forgot_password_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email")?.value;
    if (email) {
      forgotPassword({ email });
    }
  });
}

const resetPassword = async ({ password }: { password: string }) => {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });

    if ((await res.json()).status === "success") {
      alert("Password reset!");
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    }
  } catch (error) {
    alert(error.message);
  }
};

if (reset_password_form) {
  reset_password_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const password =
      document.querySelector<HTMLInputElement>("#password")?.value;
    if (password) {
      resetPassword({ password });
    }
  });
}
