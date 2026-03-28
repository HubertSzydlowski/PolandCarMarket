import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import MyAccount from './MyAccount';
import NotFound from './ErrorsComponent/NotFound';
import Forbidden from './ErrorsComponent/Forbidden';
import ServerError from './ErrorsComponent/ServerError';
import CriticalError from './ErrorsComponent/CriticalError';

// ---------------------------
//          USER
// ---------------------------

// Auth
import LoginForm from './UserComponent/Auth/LoginForm';
import LogoutButton from './UserComponent/Auth/LogoutButton';
import TokenRefresher from './UserComponent/Auth/TokenRefresher';

// Favorites
import UserFavorites from './UserComponent/Favorites/UserFavorites';
import AddToFavoritesButton from './UserComponent/Favorites/AddToFavoritesButton';
import RemoveFromFavoritesButton from './UserComponent/Favorites/RemoveFromFavoritesButton';

// User Management
import UserList from './UserComponent/UserManagement/UserList';
import UserDetails from './UserComponent/UserManagement/UserDetails';
import UserCreateForm from './UserComponent/UserManagement/UserCreateForm';
import UserEditForm from './UserComponent/UserManagement/UserEditForm';
import UserDeleteButton from './UserComponent/UserManagement/UserDeleteButton';

// ---------------------------
//          EMAIL
// ---------------------------

import EmailVerificationForm from './EmailComponent/EmailVerificationForm';
import ResetPasswordForm from './EmailComponent/ResetPasswordForm';
import ResetPasswordRequestForm from './EmailComponent/ResetPasswordRequestForm';

// ---------------------------
//       ADVERTISEMENT
// ---------------------------

import AdvertisementList from './AdvertisementComponent/AdvertisementList';
import AdvertisementDetails from './AdvertisementComponent/AdvertisementDetails';
import AdvertisementCreateForm from './AdvertisementComponent/AdvertisementCreateForm';
import AdvertisementEditForm from './AdvertisementComponent/AdvertisementEditForm';
import AdvertisementDeleteButton from './AdvertisementComponent/AdvertisementDeleteButton';

// ---------------------------
//          VEHICLE
// ---------------------------

import VehicleList from './VehicleComponent/VehicleList';
import VehicleDetails from './VehicleComponent/VehicleDetails';
import VehicleCreateForm from './VehicleComponent/VehicleCreateForm';
import VehicleEditForm from './VehicleComponent/VehicleEditForm';
import VehicleDeleteButton from './VehicleComponent/VehicleDeleteButton';

// ---------------------------
//      VEHICLE PHOTO
// ---------------------------

import VehiclePhotoList from './VehiclePhotoComponent/VehiclePhotoList';
import VehiclePhotoDetails from './VehiclePhotoComponent/VehiclePhotoDetails';
import VehiclePhotoUploadForm from './VehiclePhotoComponent/VehiclePhotoUploadForm';
import VehiclePhotoDeleteButton from './VehiclePhotoComponent/VehiclePhotoDeleteButton';

// ---------------------------
//         OFFERS
// ---------------------------
import OfferList from './OffersComponent/OfferList';
import OfferDetails from './OffersComponent/OfferDetails';
import OfferCreateForm from './OffersComponent/OfferCreateForm';
import OfferEditForm from './OffersComponent/OfferEditForm';
import OfferDeleteButton from './OffersComponent/OfferDeleteButton';

// ---------------------------
//      ADMIN PAGE
// ---------------------------

// User
import AdminUserList from './AdminPageComponent/Users/UserList';
import AdminUserDetails from './AdminPageComponent/Users/UserDetails';
import AdminUserCreateForm from './AdminPageComponent/Users/UserCreateForm';
import AdminUserEditForm from './AdminPageComponent/Users/UserEditForm';
import AdminUserDeleteButton from './AdminPageComponent/Users/UserDeleteButton';

// User/Favourites
import AdminFavoritesList from './AdminPageComponent/Users/Favorites/FavoritesList';
import AdminAddToFavoritesButton from './AdminPageComponent/Users/Favorites/AddToFavoritesButton';
import AdminRemoveFromFavoritesButton from './AdminPageComponent/Users/Favorites/RemoveFromFavoritesButton';

// Advertisement
import AdminAdvertisementList from './AdminPageComponent/Advertisements/AdvertisementList';
import AdminAdvertisementDetails from './AdminPageComponent/Advertisements/AdvertisementDetails';
import AdminAdvertisementCreateForm from './AdminPageComponent/Advertisements/AdvertisementCreateForm';
import AdminAdvertisementEditForm from './AdminPageComponent/Advertisements/AdvertisementEditForm';
import AdminAdvertisementDeleteButton from './AdminPageComponent/Advertisements/AdvertisementDeleteButton';

// Vehicle
import AdminVehicleList from './AdminPageComponent/Vehicles/VehicleList';
import AdminVehicleDetails from './AdminPageComponent/Vehicles/VehicleDetails';
import AdminVehicleCreateForm from './AdminPageComponent/Vehicles/VehicleCreateForm';
import AdminVehicleEditForm from './AdminPageComponent/Vehicles/VehicleEditForm';
import AdminVehicleDeleteButton from './AdminPageComponent/Vehicles/VehicleDeleteButton';

// VehiclePhoto
import AdminVehiclePhotoList from './AdminPageComponent/VehiclePhotos/VehiclePhotoList';
import AdminVehiclePhotoUploadForm from './AdminPageComponent/VehiclePhotos/VehiclePhotoUploadForm';
import AdminVehiclePhotoDeleteButton from './AdminPageComponent/VehiclePhotos/VehiclePhotoDeleteButton';

// Offers
import AdminOfferList from './AdminPageComponent/Offers/OfferList';
import AdminOfferDetails from './AdminPageComponent/Offers/OfferDetails';
import AdminOfferCreateForm from './AdminPageComponent/Offers/OfferCreateForm';
import AdminOfferEditForm from './AdminPageComponent/Offers/OfferEditForm';
import AdminOfferDeleteButton from './AdminPageComponent/Offers/OfferDeleteButton';

// Dashboard
import AdminDashboardComponent from './AdminPageComponent/AdminDashboard';

// Account
import AdminMyAccount from './AdminPageComponent/AdminMyAccount';

// ---------------------------
//      USER PAGE
// ---------------------------

// User/Favorites
import UserFavoritesList from './UserPageComponent/Users/Favorites/FavoritesList';
import UserAddToFavoritesButton from './UserPageComponent/Users/Favorites/AddToFavoritesButton';
import UserRemoveFromFavoritesButton from './UserPageComponent/Users/Favorites/RemoveFromFavoritesButton';

// Advertisement
import UserAdvertisementList from './UserPageComponent/Advertisements/AdvertisementList';
import UserAdvertisementDetails from './UserPageComponent/Advertisements/AdvertisementDetails';
import UserAdvertisementCreateForm from './UserPageComponent/Advertisements/AdvertisementCreateForm';
import UserAdvertisementEditForm from './UserPageComponent/Advertisements/AdvertisementEditForm';
import UserAdvertisementDeleteButton from './UserPageComponent/Advertisements/AdvertisementDeleteButton';

// Vehicle
import UserVehicleList from './UserPageComponent/Vehicles/VehicleList';
import UserVehicleDetails from './UserPageComponent/Vehicles/VehicleDetails';
import UserVehicleCreateForm from './UserPageComponent/Vehicles/VehicleCreateForm';
import UserVehicleEditForm from './UserPageComponent/Vehicles/VehicleEditForm';
import UserVehicleDeleteButton from './UserPageComponent/Vehicles/VehicleDeleteButton';

// VehiclePhoto
import UserVehiclePhotoList from './UserPageComponent/VehiclePhotos/VehiclePhotoList';
import UserVehiclePhotoUploadForm from './UserPageComponent/VehiclePhotos/VehiclePhotoUploadForm';
import UserVehiclePhotoDeleteButton from './UserPageComponent/VehiclePhotos/VehiclePhotoDeleteButton';
import AdminVehiclePhotoDetails from "./AdminPageComponent/VehiclePhotos/VehiclePhotoDetails";
import UserVehiclePhotoDetails from "./UserPageComponent/VehiclePhotos/VehiclePhotoDetails";

// Offers
import UserOfferList from './UserPageComponent/Offers/OfferList';
import UserOfferDetails from './UserPageComponent/Offers/OfferDetails';
import UserOfferCreateForm from './UserPageComponent/Offers/OfferCreateForm';
import UserOfferEditForm from './UserPageComponent/Offers/OfferEditForm';
import UserOfferDeleteButton from './UserPageComponent/Offers/OfferDeleteButton';

// Dashboard
import UserDashboardComponent from './UserPageComponent/UserDashboard';

//Account
import UserMyAccount from './UserPageComponent/UserMyAccount';


// ---------------------------
// ---------------------------
//      APP ROUTER
// ---------------------------
// ---------------------------

function AppRouter() {
    return (
        <Router>
            <TokenRefresher />

            <Routes>

                {/* --------------------------- */}
                {/*            HOME             */}
                {/* --------------------------- */}

                <Route path="/" element={<WelcomePage />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/forbidden" element={<Forbidden />} />
                <Route path="/server-error" element={<ServerError />} />
                <Route path="/critical-error" element={<CriticalError />} />

                {/* --------------------------- */}
                {/*           USER              */}
                {/* --------------------------- */}

                {/* Auth */}
                <Route path="/users/login" element={<LoginForm />} />
                <Route path="/users/logout" element={<LogoutButton />} />

                {/* Favorites */}
                <Route path="/users/:userId/favorites" element={<UserFavorites />} />
                <Route path="/users/:userId/favorites/add/:advertisementId" element={<AddToFavoritesButton />} />
                <Route path="/users/:userId/favorites/remove/:advertisementId" element={<RemoveFromFavoritesButton />} />

                {/* User Management */}
                <Route path="/users" element={<UserList/>} />
                <Route path="/users/register" element={<UserCreateForm />} />
                <Route path="/users/:userId" element={<UserDetails />} />
                <Route path="/users/:userId/edit" element={<UserEditForm />} />
                <Route path="/users/:userId/delete" element={<UserDeleteButton />} />

                {/* --------------------------- */}
                {/*           EMAIL             */}
                {/* --------------------------- */}

                <Route path="/verify-email" element={<EmailVerificationForm />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
                <Route path="/reset-password-request" element={<ResetPasswordRequestForm />} />

                {/* --------------------------- */}
                {/*        ADVERTISEMENT        */}
                {/* --------------------------- */}

                <Route path="/advertisements" element={<AdvertisementList />} />
                <Route path="/advertisements/create" element={<AdvertisementCreateForm />} />
                <Route path="/advertisements/:id" element={<AdvertisementDetails />} />
                <Route path="/advertisements/:id/edit" element={<AdvertisementEditForm />} />
                <Route path="/advertisements/:id/delete" element={<AdvertisementDeleteButton />} />

                {/* --------------------------- */}
                {/*           VEHICLE           */}
                {/* --------------------------- */}

                <Route path="/vehicles" element={<VehicleList />} />
                <Route path="/vehicles/create" element={<VehicleCreateForm />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
                <Route path="/vehicles/:id/edit" element={<VehicleEditForm />} />
                <Route path="/vehicles/:id/delete" element={<VehicleDeleteButton />} />

                {/* --------------------------- */}
                {/*      VEHICLE PHOTO         */}
                {/* --------------------------- */}

                <Route path="/vehicle-photos" element={<VehiclePhotoList />} />
                <Route path="/vehicle-photos/upload" element={<VehiclePhotoUploadForm />} />
                <Route path="/vehicle-photos/:id" element={<VehiclePhotoDetails />} />
                <Route path="/vehicle-photos/:id/delete" element={<VehiclePhotoDeleteButton />} />

                {/* --------------------------- */}
                {/*           OFFERS           */}
                {/* --------------------------- */}

                <Route path="/offers" element={<OfferList />} />
                <Route path="/offers/create" element={<OfferCreateForm />} />
                <Route path="/offers/:id" element={<OfferDetails />} />
                <Route path="/offers/:id/edit" element={<OfferEditForm />} />
                <Route path="/offers/:id/delete" element={<OfferDeleteButton />} />

                {/* --------------------------- */}
                {/*          ADMIN PAGE         */}
                {/* --------------------------- */}

                {/* ADMIN: USERS */}
                <Route path="/admin/users" element={<AdminUserList />} />
                <Route path="/admin/users/register" element={<AdminUserCreateForm />} />
                <Route path="/admin/users/:userId" element={<AdminUserDetails />} />
                <Route path="/admin/users/:userId/edit" element={<AdminUserEditForm />} />
                <Route path="/admin/users/:userId/delete" element={<AdminUserDeleteButton />} />

                {/* ADMIN: USERS/FAVORITES */}
                <Route path="/admin/users/:userId/favorites" element={<AdminFavoritesList />} />
                <Route path="/admin/users/:userId/favorites/add/:advertisementId" element={<AdminAddToFavoritesButton />} />
                <Route path="/admin/users/:userId/favorites/remove/:advertisementId" element={<AdminRemoveFromFavoritesButton />} />

                {/* ADMIN: ADVERTISEMENTS */}
                <Route path="/admin/advertisements" element={<AdminAdvertisementList />} />
                <Route path="/admin/advertisements/create" element={<AdminAdvertisementCreateForm />} />
                <Route path="/admin/advertisements/:id" element={<AdminAdvertisementDetails />} />
                <Route path="/admin/advertisements/:id/edit" element={<AdminAdvertisementEditForm />} />
                <Route path="/admin/advertisements/:id/delete" element={<AdminAdvertisementDeleteButton />} />

                {/* ADMIN: VEHICLES */}
                <Route path="/admin/vehicles" element={<AdminVehicleList />} />
                <Route path="/admin/vehicles/create" element={<AdminVehicleCreateForm />} />
                <Route path="/admin/vehicles/:id" element={<AdminVehicleDetails />} />
                <Route path="/admin/vehicles/:id/edit" element={<AdminVehicleEditForm />} />
                <Route path="/admin/vehicles/:id/delete" element={<AdminVehicleDeleteButton />} />

                {/* ADMIN: VEHICLE PHOTOS */}
                <Route path="/admin/vehicle-photos" element={<AdminVehiclePhotoList />} />
                <Route path="/admin/vehicle-photos/upload" element={<AdminVehiclePhotoUploadForm />} />
                <Route path="/admin/vehicle-photos/:id" element={<AdminVehiclePhotoDetails />} />
                <Route path="/admin/vehicle-photos/:id/delete" element={<AdminVehiclePhotoDeleteButton />} />

                {/* ADMIN: OFFERS */}
                <Route path="/admin/offers" element={<AdminOfferList />} />
                <Route path="/admin/offers/create" element={<AdminOfferCreateForm />} />
                <Route path="/admin/offers/:id" element={<AdminOfferDetails />} />
                <Route path="/admin/offers/:id/edit" element={<AdminOfferEditForm />} />
                <Route path="/admin/offers/:id/delete" element={<AdminOfferDeleteButton />} />

                {/* ADMIN: DASHBOARD */}
                <Route path="/admin/dashboard" element={<AdminDashboardComponent />} />

                {/* ADMIN MY ACCOUNT */}
                <Route path="/admin/my-account" element={<AdminMyAccount />} />

                {/* --------------------------- */}
                {/*           USER PAGE         */}
                {/* --------------------------- */}

                {/* USER: USERS/FAVORITES */}
                <Route path="/user/favorites" element={<UserFavoritesList />} />
                <Route path="/user/favorites/add/:advertisementId" element={<UserAddToFavoritesButton />} />
                <Route path="/user/favorites/remove/:advertisementId" element={<UserRemoveFromFavoritesButton />} />

                {/* USER: ADVERTISEMENTS */}
                <Route path="/user/advertisements" element={<UserAdvertisementList />} />
                <Route path="/user/advertisements/create" element={<UserAdvertisementCreateForm />} />
                <Route path="/user/advertisements/:id" element={<UserAdvertisementDetails />} />
                <Route path="/user/advertisements/:id/edit" element={<UserAdvertisementEditForm />} />
                <Route path="/user/advertisements/:id/delete" element={<UserAdvertisementDeleteButton />} />

                {/* USER: VEHICLES */}
                <Route path="/user/vehicles" element={<UserVehicleList />} />
                <Route path="/user/vehicles/create" element={<UserVehicleCreateForm />} />
                <Route path="/user/vehicles/:id" element={<UserVehicleDetails />} />
                <Route path="/user/vehicles/:id/edit" element={<UserVehicleEditForm />} />
                <Route path="/user/vehicles/:id/delete" element={<UserVehicleDeleteButton />} />

                {/* USER: VEHICLE PHOTOS */}
                <Route path="/user/vehicle-photos" element={<UserVehiclePhotoList />} />
                <Route path="/user/vehicle-photos/upload" element={<UserVehiclePhotoUploadForm />} />
                <Route path="/user/vehicle-photos/:id" element={<UserVehiclePhotoDetails />} />
                <Route path="/user/vehicle-photos/:id/delete" element={<UserVehiclePhotoDeleteButton />} />

                {/* USER: OFFERS */}
                <Route path="/user/offers" element={<UserOfferList />} />
                <Route path="/user/offers/create" element={<UserOfferCreateForm />} />
                <Route path="/user/offers/:id" element={<UserOfferDetails />} />
                <Route path="/user/offers/:id/edit" element={<UserOfferEditForm />} />
                <Route path="/user/offers/:id/delete" element={<UserOfferDeleteButton />} />

                {/* USER: DASHBOARD */}
                <Route path="/user/dashboard" element={<UserDashboardComponent />} />

                {/* USER MY ACCOUNT */}
                <Route path="/user/my-account" element={<UserMyAccount />} />

            </Routes>
        </Router>
    );
}

export default AppRouter;
